import express from "express";
import { roles } from "../constants/data.js";
import {
  createProduct,
  deleteProduct,
  exportProducts,
  getAllProducts,
  insertProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { authorize, sessionRoute } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { validateRequest } from "../middleware/validation.js";
import { objectIdSchema } from "../schema/objectId.js";
import { productSchema } from "../schema/product.js";
import asyncHandler from "../utils/asyncHandler.js";
const productRouter = express.Router();

//use middleware protect route

productRouter.route("/").get(asyncHandler(getAllProducts));

productRouter.use(asyncHandler(sessionRoute));

productRouter.use(asyncHandler(authorize([roles.ADMIN, roles.SUPER_ADMIN])));

productRouter
  .route("/upload")
  .post(upload.single("product"), asyncHandler(insertProducts));
// export product

productRouter.route("/export").get(asyncHandler(exportProducts));

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

