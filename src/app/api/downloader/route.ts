import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { downloadQueue } from '@/lib/queue';
import { rateLimit } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Whitelist domain sumber yang diizinkan. Sesuaikan dengan sumber yang
// benar-benar punya izin/lisensi untuk diunduh (CDN sendiri, API resmi, dll).
const ALLOWED_SOURCE_DOMAINS: string[] = [
  // 'cdn.punyamu.com',
];

const schema = z.object({ url: z.string().url() });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as any).id;

  const allowed = await rateLimit(`download:${userId}`, 5, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Terlalu banyak permintaan, coba lagi nanti' }, { status: 429 });
  }

  const body = schema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: 'URL tidak valid' }, { status: 400 });

  const hostname = new URL(body.data.url).hostname;
  if (ALLOWED_SOURCE_DOMAINS.length > 0 && !ALLOWED_SOURCE_DOMAINS.includes(hostname)) {
    return NextResponse.json({ error: 'Sumber tidak diizinkan' }, { status: 400 });
  }

  const job = await db.downloadJob.create({
    data: { userId, sourceUrl: body.data.url, status: 'PENDING' },
  });

  const queueJob = await downloadQueue.add(
    'process-download',
    { jobId: job.id, url: body.data.url, userId },
    { attempts: 2, backoff: { type: 'exponential', delay: 5000 } }
  );

  await db.downloadJob.update({ where: { id: job.id }, data: { queueJobId: queueJob.id } });

  return NextResponse.json({ jobId: job.id, status: 'queued' }, { status: 202 });
}
