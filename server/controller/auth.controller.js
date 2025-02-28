import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/error.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/utility.js";
import { options } from "../constants/config.js";
import session from "express-session";

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Wrong password");
  }
  // sendToken(res, user, 200, `Welcome ${user.name}`);
  req.session._id = user._id;
  console.log(req.session._id);
  return res.status(200).json({
    success: true,
    message: req.t("auth.login_success"),
    user,
  });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    throw new ApiError(400, "Email allready exists");
  }

  const newuser = await userModel.create({ name, email, password });
  // sendToken(res, newuser, 201, `Welcome ${newuser.name}`);
  req.session._id = user._id;
  return res.status(200).json({
    success: true,
    message: `Welcome ${newuser.name}`,
    user: newuser,
  });
};

const logout = async (req, res) => {

  req.session.destroy((err) => {
    throw new ApiError(500, err.message);
  })

  res.cookie("sessionId", "", { ...options, maxAge: 0 });
  return res.status(200).json({
    success: true,
    message: "You have been logged out",
  });
};

export { login, signup, logout };
