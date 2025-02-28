import jwt from "jsonwebtoken";
import { options } from "../constants/config.js";
const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);
  res.cookie("token", token, options);
  return res.status(code).json({
    success: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export { sendToken };
