import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    updateProduct,
} from "../controller/product.controller.js";
import { protectRoute } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { objectIdSchema } from "../schema/objectId.js";
import { productSchema } from "../schema/product.js";
const productRouter = express.Router();

//use middleware protect route

productRouter.route("/").get(getAllProducts);

productRouter.use(protectRoute)

productRouter.route("/").post(validateRequest(productSchema), createProduct);

productRouter
  .route("/:id")
  .patch(
    validateRequest(objectIdSchema, "params"),
    validateRequest(productSchema),
    updateProduct
  );

productRouter
  .route("/:id")
  .delete(validateRequest(objectIdSchema, "params"), deleteProduct);

export { productRouter };

