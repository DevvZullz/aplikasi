// Worker ini HARUS dijalankan sebagai proses terpisah (bukan di Vercel).
// Jalankan: npm run worker  di Railway/Render/VPS

import { Worker } from 'bullmq';
import { redisConnectionOptions } from '../lib/redis';
import { db } from '../lib/db';

async function resolveSource(url: string): Promise<{ fileName: string; sizeBytes: number }> {
  throw new Error('resolveSource() belum diimplementasikan. Sesuaikan dengan sumber legal kamu.');
}

const worker = new Worker(
  'video-download',
  async (job: any) => {
    const { jobId, url } = job.data;

    await db.downloadJob.update({ where: { id: jobId }, data: { status: 'PROCESSING' } });

    try {
      const { fileName, sizeBytes } = await resolveSource(url);
      await db.downloadJob.update({
        where: { id: jobId },
        data: {
          status: 'COMPLETED',
          fileName,
          fileSizeBytes: BigInt(sizeBytes),
          completedAt: new Date(),
        },
      });
      await db.activityLog.create({
        data: { userId: job.data.userId, action: 'DOWNLOAD_COMPLETED', metadata: { jobId, fileName } },
      });
    } catch (err: any) {
      await db.downloadJob.update({
        where: { id: jobId },
        data: { status: 'FAILED', errorMessage: err.message },
      });
    }
  },
  { connection: redisConnectionOptions, concurrency: 3 }
);

worker.on('failed', (job: any, err: any) => {
  console.error('Job gagal:', err.message);
});

console.log('Download worker berjalan...');
