import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { logout, verify } from "../controller/admin.controller.js";
const adminRouter = express.Router();

adminRouter.route("/verify").post(asyncHandler(verify));

adminRouter.route("/logout").get(asyncHandler(logout));



export { adminRouter };
