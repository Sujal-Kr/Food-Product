import { getCache, getExpire, setCache } from "../lib/redis.js";
import { ApiError } from "../utils/error.js";

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const limit = process.env.LIMIT;

  const requests = await getCache(ip) || 1;

  if (requests && requests > limit) {
    throw new ApiError(429, `Too many requests. Try again after ${await getExpire(ip)}s.`);
  }
  console.log(parseInt(requests));
  await setCache(ip, parseInt(requests) + 1);

  next();
};

export { rateLimiter };
