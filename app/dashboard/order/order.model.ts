import mongoose, { Document, Schema } from "mongoose";
import { IItem, OrderStatus, type IOrder } from "./order.type";

export interface IOrderModel extends IOrder, Document {}

const itemSchema = new Schema<IItem>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    purchaseMode: { type: Boolean, default: false }, //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
  },
  { _id: false }
);

const orderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: OrderStatus, required: true },
  items: { type: [itemSchema], required: true },
  totalPrice: { type: Number, required: true },
  paymentDetails: {
    method: { type: String },
    transactionId: { type: String },
  },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel: mongoose.Model<IOrderModel> =
  mongoose.models.Order || mongoose.model<IOrderModel>("Order", orderSchema);
export default OrderModel;
