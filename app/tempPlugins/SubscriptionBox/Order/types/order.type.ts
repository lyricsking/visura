import type { Types } from "mongoose";
import { IAddress } from "./address.type";

export const OrderStatus = {
  cart: "cart", //  Orders still in cart
  checkout: "checkout", //  Order has been accepted and ready for payment
  completed: "completed", //  Order completed
  inTransit: "inTransit", //  Order is in transit now.
  paid: "paid", // Order has been paid for
  processing: "processing",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderPurchaseMode = {
  "one-time": "one-time",
  "bi-weekly": "bi-weekly",
  "weekly": "weekly",
  "monthly": "monthly",
  "bi-monthly": "bi-monthly",
  "quarterly": "quarterly"
} as const;
export type OrderPurchaseMode = typeof OrderPurchaseMode[keyof typeof OrderPurchaseMode];

export interface IItem {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  total: number;
  purchaseMode?: OrderPurchaseMode; //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
}

export interface IOrder {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: OrderStatus;
  items: IItem[];
  totalPrice: number;
  address: IAddress;
  paymentDetails?: {
    method: string;
    transactionId: string;
  };
  discount: {
    type: string;
    value: number;
  }
  createdAt: Date;
  updatedAt: Date;
}