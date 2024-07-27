import { Types } from 'mongoose';

export interface ISubscription {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  planId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'paused' | 'cancelled';
  renewalDate: Date;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
