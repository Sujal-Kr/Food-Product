const options = {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 24,
};

const REDIS_URL = process.env.REDIS_URL;



export { options, REDIS_URL };
