import { productModel } from "../models/product.model.js";
import { ApiError } from "../utils/error.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({
      success: true,
      message: "Product Retrieved Successfully",
      products,
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;

    const product = await productModel.create({ name, price, category });

    return res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new ApiError(400, "Product id is required");
    }

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
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, category, price } = req.body;

    if (!id) {
      throw new ApiError(400, "Product id is required");
    }

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
    
  } catch (err) {
    next(err);
  }
};

export { createProduct, deleteProduct, updateProduct, getAllProducts };
