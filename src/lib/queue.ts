import { Queue } from 'bullmq';
import { redisConnectionOptions } from './redis';

export const downloadQueue = new Queue('video-download', {
  connection: redisConnectionOptions,
});
