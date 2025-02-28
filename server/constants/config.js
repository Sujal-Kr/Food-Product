import dotenv from "dotenv";
dotenv.config();

const options = {
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 30,
};

const PORT = process.env.PORT || 4000;

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const RATE_LIMIT = process.env.RATE_LIMIT;

const DB_URL = process.env.DB_URL;

const REDIS_URL = process.env.REDIS_URL;

const SENDER_MAIL=process.env.SENDER_MAIL

const RECEIVER_MAIL=process.env.RECEIVER_MAIL

const PASSWORD=process.env.PASSWORD



export {
  options,
  REDIS_URL,
  PORT,
  ADMIN_SECRET_KEY,
  JWT_SECRET_KEY,
  RATE_LIMIT,
  DB_URL,
  SENDER_MAIL,
  RECEIVER_MAIL,
  PASSWORD,
};
