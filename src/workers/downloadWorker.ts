// Worker ini HARUS dijalankan sebagai proses terpisah dari web server,
// misalnya: `npm run worker` di service terpisah (Railway/Render/VPS).
// Jangan dijalankan di environment serverless (Vercel) karena sifatnya long-running.

import { Worker } from 'bullmq';
import { redisConnection } from '../lib/redis';
import { db } from '../lib/db';

/**
 * Implementasikan sesuai sumber yang DIIZINKAN secara hukum/ToS:
 * - direct file URL publik,
 * - storage milik sendiri (S3/Supabase Storage),
 * - API resmi dari penyedia konten.
 * Jangan gunakan untuk scraping/bypass proteksi platform pihak ketiga.
 */
async function resolveSource(url: string): Promise<{ fileName: string; sizeBytes: number }> {
  throw new Error('resolveSource() belum diimplementasikan untuk sumber ini. Sesuaikan dengan sumber legal kamu.');
}

const worker = new Worker(
  'video-download',
  async (job) => {
    const { jobId, url } = job.data as { jobId: string; url: string };

    await db.downloadJob.update({ where: { id: jobId }, data: { status: 'PROCESSING' } });

    try {
      const { fileName, sizeBytes } = await resolveSource(url);

      await db.downloadJob.update({
        where: { id: jobId },
        data: { status: 'COMPLETED', fileName, fileSizeBytes: BigInt(sizeBytes), completedAt: new Date() },
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
  { connection: redisConnection, concurrency: 3 } // batasi concurrency agar bandwidth tidak jebol
);

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} gagal:`, err.message);
});

console.log('Download worker berjalan...');
