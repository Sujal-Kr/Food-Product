import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/error.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/utility.js";
import { options } from "../constants/config.js";
import { TryCatch } from "../middleware/error.js";

const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Wrong password");
  }
  sendToken(res, user, 200, `Welcome ${user.name}`);
});

const signup = TryCatch(async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    throw new ApiError(400, "Email allready exists");
  }
  const newuser = await userModel.create({ name, email, password });
  sendToken(res, newuser, 201, `Welcome ${newuser.name}`);

});

const logout = TryCatch(async (_, res, next) => {

  res.cookie("token", "", { ...options, maxAge: 0 });
  return res.status(200).json({
    success: true,
    message: "You have been logged out",
  });

});

export { login, signup, logout };
