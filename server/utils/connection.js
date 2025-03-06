import mongoose from "mongoose";
import { DB_URL } from "../constants/config.js";
export const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connection Established");
  } catch (err) {
    console.error("Failed to establish connection", err.message);
  }
};
