import { Queue } from 'bullmq';
import { redisConnection } from './redis';

export const downloadQueue = new Queue('video-download', { connection: redisConnection });
