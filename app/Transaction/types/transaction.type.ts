import { Types } from 'mongoose';

const PaymentMethods = {
  "Card": "card",
  "Bank Transfer": "banktransfer",
  "Opay": "opay",
  "# USSD": "ussd",
  "Direct Debit": "account",
  //  "Google Pay": "googlepay",
  //  "Apple Pay": "applepay",
} as const;
type PaymentMethods = typeof PaymentMethods[keyof typeof PaymentMethods];

const PaymentStatus = {
  "Pending": "pending",
  "Completed": "completed",
  "Failed": "failed",
  } as const;
type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

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
