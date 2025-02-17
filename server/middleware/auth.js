import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";

const protectRoute = async (req, _, next) => {
  const secret = process.env.JWT_SECRET_KEY;
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(400, "User not logged in");
    }
    const payload = jwt.verify(token, secret);
    if (!payload) {
      throw new ApiError(400, "Invalid token");
    }
    req._id = payload._id;

    next();
  } catch (err) {
    next(err);
  }
};

const adminRoute = (req, _, next) => {
  const secret = process.env.JWT_SECRET_KEY;

  const token = req.cookies?.admin;

  if (!token) {
    throw new ApiError(400, "Admin not logged in");
  }
  const payload = jwt.verify(token, secret);
  if (!payload) {
    throw new ApiError(400, "Invalid token");
  }
  const admin = process.env.ADMIN_SECRET_KEY || "amdin";

  const isMatch = payload.key === admin;
  
  if (!isMatch) {
    throw new ApiError(400, "Unauthorized Access");
  }
  next();
};

export { protectRoute, adminRoute };
