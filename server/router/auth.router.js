import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import { validateRequest } from "../middleware/validation.js";
import { loginSchema, signupSchema } from "../schema/user.js";
const authRouter = express.Router();

authRouter
.route('/login')
.post(validateRequest(loginSchema),login)

authRouter
.route('/signup')
.post(validateRequest(signupSchema),signup)

authRouter
.route('/logout')
.get(logout)


export { authRouter };
