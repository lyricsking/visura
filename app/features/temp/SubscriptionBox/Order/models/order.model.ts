import mongoose, { model, Schema, type Model } from "mongoose";
import {
  IItem,
  IOrder,
  OrderPurchaseMode,
  OrderStatus,
} from "../types/order.type";
import { discountSchema } from "./discount.model";
import { addressSchema } from "./address.model";

const itemSchema = new Schema<IItem>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    purchaseMode: { type: String, enum: Object.values(OrderPurchaseMode) },
  },
  { _id: false }
);

const newDiscountSchema = discountSchema.clone();
newDiscountSchema.path("_id", false);
//  Create new address schema for order, this is neccessary to keep record of delivery address even after the mani address is modified or deleted.
//const newAddressSchema = addressSchema.clone();
//newAddressSchema.path("_id", false);
export type OrderModel = Model<IOrder>;
const orderSchema = new Schema<IOrder, OrderModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: OrderStatus, required: true },
  items: { type: [itemSchema], required: true },
  totalPrice: { type: Number, required: true },
  discount: { type: newDiscountSchema },
  address: { type: addressSchema }, //  Pass and entire schema obj, this is neccessary to keep record of delivery address even after the main address is modified or deleted.
  paymentDetails: {
    method: { type: String },
    transactionId: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Order: OrderModel =
  mongoose.models.Order || model<IOrder, OrderModel>("Order", orderSchema);
