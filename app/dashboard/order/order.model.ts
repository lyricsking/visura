import mongoose, { Document, Schema } from "mongoose";

export interface IOrderModel extends IOrder, Document {}

const itemSchema = new Schema({
  _id: false,
  productId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  isSubscribe: { type: Boolean, default: false }, //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
});

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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel: mongoose.Model<IOrderModel> =
  mongoose.models.Order || mongoose.model<IOrderModel>("Order", orderSchema);
export default OrderModel;