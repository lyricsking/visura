import { Types } from "mongoose";

export const PaymentMethods = {
  Card: "card",
  "Bank Transfer": "banktransfer",
  Opay: "opay",
  "# USSD": "ussd",
  "Direct Debit": "account",
  //  "Google Pay": "googlepay",
  //  "Apple Pay": "applepay",
} as const;
export type PaymentMethods =
  (typeof PaymentMethods)[keyof typeof PaymentMethods];

export const PaymentStatus = {
  Pending: "pending",
  Completed: "completed",
  Failed: "failed",
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export interface ITransaction {
  _id: Types.ObjectId;
  invoiceId: Types.ObjectId;
  transactionId?: string;
  amount: number;
  fees: number;
  currency: string;
  date: Date;
  status: PaymentStatus;
  paymentMethod: PaymentMethods;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
