import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  createOrder,
  deleteOrder,
  getMyOrders,
  updateOrderStatus,
} from "../controller/order.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { objectIdSchema } from "../schema/objectId.js";
import { validateRequest } from "../middleware/validation.js";
import { orderValidationSchema, paymentStatus } from "../schema/order.js";

const orderRouter = express.Router();

orderRouter.use(protectRoute);

orderRouter
  .route("/")
  .get(asyncHandler(getMyOrders))
  .post(validateRequest(orderValidationSchema), asyncHandler(createOrder));

orderRouter
  .route("/:id")
  .patch(
    validateRequest(paymentStatus),
    validateRequest(objectIdSchema, "params"),
    asyncHandler(updateOrderStatus)
  )
  .delete(validateRequest(objectIdSchema, "params"), asyncHandler(deleteOrder));

export { orderRouter };
