interface IItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  total: number;
  isSubscribe: boolean, //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
}

export const OrderStatus = {
  cart: "cart", //  Orders still in cart
  checkout: "checkout", //  Order has been accepted and ready for payment
  completed: "completed", //  Order completed
  inTransit: "inTransit", //  Order is in transit now.
  paid: "paid", // Order has been paid for
  processing: "processing",
} as const
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  status: OrderStatus;
  items: IItem[];
  totalPrice: number;
  paymentDetails?: {
    method: string;
    transactionId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  isSubscribe: {type: Boolean, default: false }, //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
});

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, enum: OrderStatus, required: true },
  items: [itemSchema],
  totalPrice: { type: Number, required: true },
  paymentDetails: {
    method: { type: String },
    transactionId: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order: Model<IOrder> = mongoose.models.Order|| mongoose.model<IOrder>('Order', orderSchema);
export default Order;