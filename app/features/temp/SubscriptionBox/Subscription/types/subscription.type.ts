import { Types } from "mongoose";

export interface IItem {
  product: Types.ObjectId;
  name: string;
  quantity: number;
}

export const SubscriptionStatus = {
  active: "active",
  paused: "paused",
  cancelled: "cancelled",
} as const;
export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export interface ISubscription {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: IItem[];
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  renewalDate: Date;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
