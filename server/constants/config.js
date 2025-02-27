const options = {
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 30,
};

const REDIS_URL = process.env.REDIS_URL;

export { options, REDIS_URL };
