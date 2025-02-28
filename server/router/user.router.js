import express from "express";
import { sessionRoute } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getProfile } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.use(asyncHandler(sessionRoute));

userRouter.route("/profile").get(asyncHandler(getProfile));

export { userRouter };
