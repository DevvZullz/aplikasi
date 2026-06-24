import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as { redis: Redis };

export const redisConnection =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL!, { maxRetriesPerRequest: null, enableReadyCheck: false });

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redisConnection;

// Connection options untuk BullMQ (v5 butuh IORedis options, bukan instance)
const redisUrl = new URL(process.env.REDIS_URL ?? 'redis://localhost:6379');
export const bullMQConnection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port) || 6379,
  password: redisUrl.password || undefined,
  tls: redisUrl.protocol === 'rediss:' ? {} : undefined,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};
