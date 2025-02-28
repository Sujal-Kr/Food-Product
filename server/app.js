import express from "express";
import dotenv from "dotenv";dotenv.config()
import morgan from "morgan";
import session from "express-session";
import { RedisStore } from "connect-redis";
import cookieParser from "cookie-parser";

import { connect } from "./utils/connection.js";
import { productRouter } from "./router/product.router.js";
connect()
import client from "./config/redisClient.js";
import { handleApiError } from "./middleware/error.js";
import { authRouter } from "./router/auth.router.js";
import { adminRouter } from "./router/admin.router.js";
import { orderRouter } from "./router/order.router.js";
import asyncHandler from "./utils/asyncHandler.js";
import { rateLimiter } from "./middleware/limit.js";
import { options, PORT } from "./constants/config.js";
import { userRouter } from "./router/user.router.js";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

//use cors 

// const port = PORT|| 4000;

app.get("/", (req, res) => {
  return res.send("Hello, world!");
});


app.use(session({
  store :new RedisStore({client}),
  secret:process.env.SESSION_SECRET_KEY,
  saveUninitialized:false,
  resave:false,
  name:'sessionId',
  cookie:options,
}))

app.use(asyncHandler(rateLimiter))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/user',userRouter)

// to handle api errors
app.use(handleApiError)

app.listen(PORT, () => {
  console.log("Server is active on port " + PORT);
});

