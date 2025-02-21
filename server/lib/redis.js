import client from "../config/redisClient.js";

const getCache = async (key) => {
  try {
    return await client.get(key);
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 60) => {
  try {
    await client.set(key, value, { EX: ttl });
  } catch (error) {
    console.log(err.message);
  }
};

const deleteCache = async (key) => {
  try {
    await client.del(key);
  } catch (error) {
    console.log(err.message);
  }
};

export { getCache, setCache, deleteCache };
