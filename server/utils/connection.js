import mongoose from "mongoose";
export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connection Established");
  } catch (err) {
    console.error("Failed to establish connection", err.message);
  }
};
