import { RATE_LIMIT } from "../constants/config.js";
import { getCache, getExpire, setCache } from "../lib/redis.js";
import { ApiError } from "../utils/error.js";

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  
  const requests = await getCache(ip) || 1;

  if (requests && requests > RATE_LIMIT) {
    throw new ApiError(429, `Too many requests. Try again after ${await getExpire(ip)}s.`);
  }
  
  await setCache(ip, parseInt(requests) + 1);

  next();
};

export { rateLimiter };
