import mongoose, { Schema, Document } from 'mongoose';
import type { ITransaction } from '../types/transaction.type.ts';

export type TransactionModel = Model<ITransaction>
// Define the Transaction schema
const TransactionSchema: Schema = new Schema<ITransaction, TransactionModel>({
  invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
  transactionId: { type: String, required: false },
  amount: { type: Number, required: true },
  fees: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: Object.values(PaymentStatus), required: true },
  paymentMethod: { type: String, enum: Object.values(PaymentMethods), required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update `updatedAt` field on save
TransactionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Define the Transaction model
const Transaction: TransactionModel = mongoose.models.Transaction || mongoose.model<ITransaction, TransactionModel>('Transaction', TransactionSchema);

export default Transaction;
