import mongoose, { Schema, Types } from "mongoose";
const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: {
      type: [Types.ObjectId],
      ref: "product",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export { orderModel };
