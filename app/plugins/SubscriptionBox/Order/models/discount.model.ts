import mongoose, { model, Model, mongo, Schema } from "mongoose";
import { DiscountType, type IDiscount } from "../types/discount.type";

export type DiscountModel = Model<IDiscount>;
export const discountSchema = new Schema<IDiscount, DiscountModel>({
  code: String,
  type: { type: String, enum: Object.values(DiscountType) },
  value: { type: Number, requured: true },
});

export const Discount: DiscountModel =
  mongoose.models.Discount ||
  model<IDiscount, DiscountModel>("Discount", discountSchema);
