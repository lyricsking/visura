import mongoose, { Schema, Document } from 'mongoose';
import { ISubscription, IItem } from '../types/subscription.type.ts';  

// Define the Item schema
const ItemSchema: Schema = new Schema<IItem>({
  _id: false,
  product: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export type SubscriptionModel = Model<ISubscription>
// Define the Subscription schema
const SubscriptionSchema: Schema = new Schema<ISubscription, SubscriptionModel>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [ItemSchema],  // Embed Item schema
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: Object.values(SubscriptionStatus), required: true },
  renewalDate: { type: Date, required: true },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update `updatedAt` field on save
SubscriptionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Define the Subscription model
const Subscription: SubscriptionModel = mongoose.models.Subscription || mongoose.model<ISubscription, SubscriptionModel>('Subscription', SubscriptionSchema);

export default SubscriptionModel;
