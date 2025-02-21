import { ALL_PRODUCTS } from "../constants/data.js";
import { deleteCache, getCache, setCache } from "../lib/redis.js";
import { productModel } from "../models/product.model.js";
import { ApiError } from "../utils/error.js";

const getAllProducts = async (_, res) => {
  const cachedProducts = await getCache(ALL_PRODUCTS);

  if (cachedProducts) {
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully (from cache)",
      products: cachedProducts,
    });
  }

  const products = await productModel.find({});

  await setCache(ALL_PRODUCTS, products, 300);

  return res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    products,
  });
};

const createProduct = async (req, res) => {
  const { name, price, category } = req.body;

  const product = await productModel.create({ name, price, category });
  await deleteCache(ALL_PRODUCTS);
  return res.status(200).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
    throw new ApiError(400, "Product not found");
  }
  await productModel.findByIdAndDelete(id);
  await deleteCache(ALL_PRODUCTS);

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    product,
  });
};

const updateProduct = async (req, res) => {
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
  await deleteCache(ALL_PRODUCTS);

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

export { createProduct, deleteProduct, getAllProducts, updateProduct };
