import { Queue } from 'bullmq';
import { bullMQConnection } from './redis';

export const downloadQueue = new Queue('video-download', { connection: bullMQConnection });
