import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { roles } from "../constants/data.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: [8, "Password must be at least 4 characters"],
    max: [20, "Password must be at most 20 characters"],
    select:false
  },
  role:{
    type:String,
    enum:Object.values(roles),
    default:"user",
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export { userModel };
