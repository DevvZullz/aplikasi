import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const job = await db.downloadJob.findUnique({ where: { id: params.id } });
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const userId = (session.user as any).id;
  const role = (session.user as any).role;
  if (job.userId !== userId && role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(job);
}
