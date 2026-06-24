import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as { redis: Redis };

export const redisConnection =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redisConnection;

export const redisConnectionOptions = {
  host: process.env.REDIS_URL
    ? new URL(process.env.REDIS_URL).hostname
    : 'localhost',
  port: process.env.REDIS_URL
    ? parseInt(new URL(process.env.REDIS_URL).port || '6379')
    : 6379,
  password: process.env.REDIS_URL
    ? new URL(process.env.REDIS_URL).password
    : undefined,
  tls: process.env.REDIS_URL?.startsWith('rediss://') ? {} : undefined,
  maxRetriesPerRequest: null as null,
};
