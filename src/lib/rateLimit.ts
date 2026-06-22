import { redisConnection } from './redis';

/**
 * Simple fixed-window rate limiter.
 * @returns true jika request masih diizinkan, false jika limit terlampaui.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const count = await redisConnection.incr(key);
  if (count === 1) {
    await redisConnection.expire(key, windowSeconds);
  }
  return count <= limit;
}
