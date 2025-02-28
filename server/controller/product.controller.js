import fs from "fs";
import path from "path";
import _ from "lodash";
import { ALL_PRODUCTS } from "../constants/data.js";
import { deleteCache, getCache, setCache } from "../lib/redis.js";
import { productModel } from "../models/product.model.js";
import { ApiError } from "../utils/error.js";
import { productSchema } from "../schema/product.js";
import {
  readFromExcel,
  sendEmailWithAttachment,
  writeToExcel,
} from "../utils/utility.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  if (_isEmpty(product)) {
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

  if (_.isEmpty(product)) {
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

//
const insertProducts = async (req, res) => {
  const buffer = req.file.buffer;

  const data = readFromExcel(buffer);

  const products = [];

  for (let product of data) {
    const { error, value } = productSchema.validate(product);
    if (error) {
      throw new ApiError(400, error.message);
    }
    products.push(value);
  }

  const insertedProducts = await productModel.insertMany(data);

  await deleteCache(ALL_PRODUCTS);

  return res.status(201).json({
    success: true,
    message: "Products inserted successfully",
    products: insertedProducts,
  });
};

const exportProducts = async (req, res) => {
  const products = await productModel.find({});
  const data = products.map(({ _id, name, price, category }) => {
    return {
      _id: _id.toString(),
      name,
      price,
      category,
    };
  });
  writeToExcel(data, "products.xlsx");
  console.log(__dirname, "../upload/products.xlsx");
  const filePath = path.join(__dirname, "../upload/products.xlsx");
  console.log(filePath);

  await sendEmailWithAttachment(filePath)
  fs.unlinkSync(filePath);
  
  return res.status(200).json({
    success: true,
    message: "Products exported successfully",
  });
};

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  insertProducts,
  exportProducts,
};
