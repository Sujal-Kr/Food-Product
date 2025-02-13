import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/error.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/utility.js";
import { options } from "../constants/config.js";


const login = async (req, res, next) => {
  try {
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

  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);
    const user = await userModel.findOne({ email });
    if (user) {
      throw new ApiError(400, "Email allready exists");
    }
    const newuser = await userModel.create({ name, email, password });
    sendToken(res, newuser, 201, `Welcome ${newuser.name}`);
  } catch (err) {
    next(err);
  }
};

const logout = async (_, res, next) => {
  try {
    res.cookie("token", "", { ...options, maxAge: 0 });
    return res.status(200).json({
      success: true,
      message: "You have been logged out",
    });
  } catch (err) {
    next(err);
  }
};

export { login, signup, logout };
