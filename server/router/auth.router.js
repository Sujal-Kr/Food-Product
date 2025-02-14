import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { loginSchema, signupSchema } from "../schema/user.js";
import asyncHandler from "../utils/asyncHandler.js";
const authRouter = express.Router();

authRouter
.route('/login')
.post(validateRequest(loginSchema),asyncHandler(login))

authRouter
.route('/signup')
.post(validateRequest(signupSchema),asyncHandler(signup))

authRouter
.route('/logout')
.get(asyncHandler(logout))



export { authRouter };
