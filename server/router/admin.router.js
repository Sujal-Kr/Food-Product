import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { logout, verify } from "../controller/admin.controller.js";
import { adminKeySchema } from "../schema/admin.js";
import { validateRequest } from "../middleware/validation.js";
const adminRouter = express.Router();

adminRouter.route("/verify").post(validateRequest(adminKeySchema),asyncHandler(verify));

adminRouter.route("/logout").get(asyncHandler(logout));

export { adminRouter };
