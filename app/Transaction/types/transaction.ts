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

export interface ITransaction {
  _id: Types.ObjectId;
  transactionId: string;
  amount: number;
  currency: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: PaymentMethods;
  description: string;
  accountId: Types.ObjectId;
  merchant: {
    name: string;
    merchantId: string;
  };
  transactionType: 'debit' | 'credit';
  fees: number;
}
