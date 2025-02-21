import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { authorize, protectRoute } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { objectIdSchema } from "../schema/objectId.js";
import { productSchema } from "../schema/product.js";
import asyncHandler from "../utils/asyncHandler.js";
import { roles } from "../constants/data.js";
const productRouter = express.Router();

//use middleware protect route

productRouter.route("/").get(asyncHandler(getAllProducts));

productRouter.use(protectRoute);
productRouter.use(asyncHandler(authorize([roles.ADMIN, roles.SUPER_ADMIN])));

productRouter
  .route("/")
  .post(validateRequest(productSchema), asyncHandler(createProduct));

productRouter
  .route("/:id")
  .patch(
    validateRequest(objectIdSchema, "params"),
    validateRequest(productSchema),
    asyncHandler(updateProduct)
  );

productRouter
  .route("/:id")
  .delete(
    validateRequest(objectIdSchema, "params"),
    asyncHandler(deleteProduct)
  );

export { productRouter };
