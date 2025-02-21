import client from "../config/redisClient.js";

const getCache = async (key) => {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 60) => {
  try {
    await client.set(key, JSON.stringify(value), { EX: ttl });
  } catch (err) {
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
