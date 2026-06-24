import { redisConnection } from './redis';

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const count = await redisConnection.incr(key);
  if (count === 1) {
    await redisConnection.expire(key, windowSeconds);
  }
  return count <= limit;
}
