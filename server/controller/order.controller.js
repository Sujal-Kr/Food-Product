import { ALL_ORDERS } from "../constants/data.js";
import { deleteCache, getCache, setCache } from "../lib/redis.js";
import { orderModel } from "../models/order.model.js";
import { productModel } from "../models/product.model.js";
import { ApiError } from "../utils/error.js";

const getMyOrders = async (req, res) => {
  const key = `orders:${req._id}`;
  const cachedOrders = await getCache(key);

  if (cachedOrders) {
    return res.status(200).json({
      success: true,
      message: "Order Results (from cache)",
      orders: cachedOrders,
    });
  }
  const orders = await orderModel
    .find({ user: req._id })
    .populate("user", "name email")
    .populate("items.product", "name price");

  await setCache(key, orders, 300);

  return res.status(200).json({
    success: true,
    message: "Order Results",
    orders,
  });
};

const createOrder = async (req, res) => {
  const { items, payment = false } = req.body;

  const promises = items.map((item) => productModel.findById(item.product));
  const products = await Promise.all(promises);

  if (products.some((product) => !product)) {
    throw new ApiError(404, "Product not found");
  }

  const amount = products.reduce((total, product, index) => {
    return total + product.price * items[index].quantity;
  }, 0);

  console.log(amount);

  const order = await orderModel.create({
    user: req._id,
    items,
    amount,
    payment,
  });

  await deleteCache(ALL_ORDERS);
  await deleteCache(`orders:${req._id}`);

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
};

const deleteOrder = async (req, res) => {
  
  const { id } = req.params;
  const order = await orderModel.findById(id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  if (order.user.toString() !== req._id.toString()) {
    throw new ApiError(401, "Unauthorized operation");
  }
  await orderModel.findByIdAndDelete(id);

  await deleteCache(ALL_ORDERS);
  await deleteCache(`orders:${req._id}`);

  return res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { payement } = req.body;
  const order = await orderModel.findById(id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.user.toString() !== req._id.toString()) {
    throw new ApiError(401, "Unauthorized Operation");
  }
  order.payement = payement;
  await order.save();

  await deleteCache(ALL_ORDERS);
  await deleteCache(`orders:${req._id}`);

  return res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
};

const getAllOrders = async (_, res) => {
  const cachedOrders = await getCache(ALL_ORDERS);

  if (cachedOrders) {
    return res.status(200).json({
      success: true,
      message: "Order Results (from cache)",
      orders: cachedOrders,
    });
  }

  const orders = await orderModel
    .find({})
    .populate("user", "name email")
    .populate("items.product", "name price");

  await setCache(ALL_ORDERS, orders, 300);

  return res.status(200).json({
    success: true,
    message: "Order Results",
    orders,
  });
};

export {
  getAllOrders,
  getMyOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
