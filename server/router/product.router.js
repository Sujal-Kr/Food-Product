import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { validate } from "../lib/validator.js";
import { validateRequest } from "../middleware/validation.js";
const productRouter = express.Router();

//use middleware protect route

productRouter.route("/").get(getAllProducts)
productRouter.route("/").post(validateRequest(),createProduct)

productRouter.route("/:id").patch(validate,updateProduct)
productRouter.route("/:id").delete(deleteProduct)


export { productRouter };
