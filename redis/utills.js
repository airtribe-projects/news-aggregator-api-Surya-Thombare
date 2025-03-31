import { Redis } from 'ioredis'
import redis from 'redis';
import { promisify } from 'util';

// News API Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const DEFAULT_COUNTRY = 'us'; // Default country code
const REDIS_CACHE_EXPIRATION = 3600; // Cache expiry in seconds (1 hour)
const REDIS_NEWS_KEY = 'latest_news'; // Redis key for storing news


export const redisClient = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379'
)


// Convert Redis callback-based functions to Promise-based
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.setex).bind(redisClient);




function buildRedisKey(country, category) {
  let key = REDIS_NEWS_KEY;

  if (country && country !== DEFAULT_COUNTRY) {
    key += `:${country}`;
  }

  if (category) {
    key += `:${category}`;
  }

  return key;
}




export async function cacheNewsInRedis(articles, country = DEFAULT_COUNTRY, category = '') {
  try {
    const key = buildRedisKey(country, category);
    await setAsync(key, REDIS_CACHE_EXPIRATION, JSON.stringify(articles));
    console.log(`News cached in Redis with key: ${key}, expires in ${REDIS_CACHE_EXPIRATION} seconds`);
    return true;
  } catch (error) {
    console.error('Error caching news in Redis:', error.message);
    return false;
  }
}


export async function getNewsFromRedis(country = DEFAULT_COUNTRY, category = '') {
  try {
    const key = buildRedisKey(country, category);
    const cachedNews = await getAsync(key);

    if (cachedNews) {
      console.log(`Retrieved news from Redis cache with key: ${key}`);
      return JSON.parse(cachedNews);
    }

    return null;
  } catch (error) {
    console.error('Error getting news from Redis:', error.message);
    return null;
  }
}