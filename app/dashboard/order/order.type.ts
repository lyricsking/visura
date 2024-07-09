import mongoose from "mongoose";

export const OrderStatus = {
  cart: "cart", //  Orders still in cart
  checkout: "checkout", //  Order has been accepted and ready for payment
  completed: "completed", //  Order completed
  inTransit: "inTransit", //  Order is in transit now.
  paid: "paid", // Order has been paid for
  processing: "processing",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface IItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  total: number;
  isSubscribe?: boolean; //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
}

export interface IOrder {
  name: string;
  email: string;
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
