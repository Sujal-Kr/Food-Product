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

export { protectRoute };
