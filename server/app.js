import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connect } from "./utils/connection.js";
import { productRouter } from "./router/product.router.js";
connect()
import { handleApiError } from "./middleware/error.js";
import { authRouter } from "./router/auth.router.js";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

//use cors 

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  return res.send("Hello, world!");
});




app.use('/api/v1/auth',authRouter)
app.use('/api/v1/product',productRouter)

// to handle api errors
app.use(handleApiError)

app.listen(port, () => {
  console.log("Server is active on port " + port);
});

