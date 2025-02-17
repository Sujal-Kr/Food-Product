import { options } from "../constants/config.js";
import { ApiError } from "../utils/error.js";
import jwt from "jsonwebtoken";

const verify = async (req, res) => {
  const { secret } = req.body;
  const key = process.env.ADMIN_SECRET_KEY || "admin";
  
  const isMatch = key === secret;

  if (!isMatch) {
    throw new ApiError(400, "Wrong Credential");
  }
  const token = jwt.sign({ key }, process.env.JWT_SECRET_KEY);
  if (!token) {
    throw new ApiError(400, "Invalid token");
  }
  res.cookie("admin", token, { ...options, maxAge: 1000 * 60 * 15 });
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
};

const logout = (_, res) => {
  res.cookie("admin", "", { ...options, maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Admin Logged Out",
  });
};

export { verify, logout };
