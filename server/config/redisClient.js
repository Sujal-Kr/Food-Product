import redis from "redis";
import { REDIS_URL } from "../constants/config.js";



const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("error", (err) => {
  console.log("Redis Connection Error", err.message);
});

client.on("connect", () => {
  console.log(`Redis Connected On: ${process.env.REDIS_URL}`);
});

client.connect();

export default client;
