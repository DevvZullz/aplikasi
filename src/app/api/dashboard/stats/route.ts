import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { redisConnection } from '@/lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as any).id;
  const cacheKey = `stats:${userId}`;

  const cached = await redisConnection.get(cacheKey);
  if (cached) return NextResponse.json(JSON.parse(cached));

  const [totalDownloads, totalMessages, recentActivity] = await Promise.all([
    db.downloadJob.count({ where: { userId } }),
    db.message.count({ where: { senderId: userId } }),
    db.activityLog.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 10 }),
  ]);

  const stats = { totalDownloads, totalMessages, recentActivity };

  await redisConnection.set(cacheKey, JSON.stringify(stats), 'EX', 60); // cache 60 detik

  return NextResponse.json(stats);
}
