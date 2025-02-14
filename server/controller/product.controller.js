import { TryCatch } from "../middleware/error.js";
import { productModel } from "../models/product.model.js";
import { ApiError } from "../utils/error.js";

const getAllProducts = TryCatch(async (req, res, next) => {
  const products = await productModel.find({});
  return res.status(200).json({
    success: true,
    message: "Product Retrieved Successfully",
    products,
  });
});

const createProduct = TryCatch(async (req, res, next) => {
  const { name, price, category } = req.body;

  const product = await productModel.create({ name, price, category });

  return res.status(200).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
});

const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await productModel.findById(id);
  if (!product) {
    throw new ApiError(400, "Product not found");
  }
  await productModel.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    product,
  });
});

const updateProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const { name, category, price } = req.body;

  const product = await productModel.findById(id);

  if (!product) {
    throw new ApiError(404, "Product is not found");
  }

  product.name = name;
  product.category = category;
  product.price = price;

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

export { createProduct, deleteProduct, updateProduct, getAllProducts };
