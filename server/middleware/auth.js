import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";
import { userModel } from "../models/user.model.js";
import _ from "lodash";

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

const sessionRoute = (req, res, next) => {
  if (_.isEmpty(req.session) || _.isEmpty(req.session._id)) {
    throw new ApiError(401, "User not logged in");
  }

  next();
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

const authorize = (roles) => {
  return async (req, res, next) => {
    const user = await userModel.findById(req?._id || req.session._id);

    if (!roles.includes(user.role)) {
      throw new ApiError(403, "Access denied! You don't have permission.");
    }
    next();
  };
};

export { protectRoute, adminRoute, authorize, sessionRoute };
