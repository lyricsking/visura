import mongoose, { Document, Schema } from "mongoose";
import { DiscountType, IDiscount } from "../type/discount.type";

export interface IDiscountModel extends IDiscount, Document {}

export const discountSchema = new Schema<IDiscountModel>({
  code: String,
  type: {type: String, enum: Object.values(DiscountType)},
  value: {type: Number, requured: true}
});

const DiscountModel: mongoose.Model<IDiscountModel> =
  mongoose.models.Discount || mongoose.model<IDiscountModel>("Discount", discountSchema);
export default DiscountModel;
