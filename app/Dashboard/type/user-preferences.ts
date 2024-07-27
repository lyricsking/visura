import { Schema, model, Types, Document } from 'mongoose';

interface IAccount {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  billingAddress: string;
}

interface INotification {
  preferredSupportChannel: 'email' | 'chat' | 'phone';
  orderUpdates: boolean;
  promotional: boolean;
  subscriptionReminders: boolean;
  supportNotification: boolean;
}

interface IDisplay {
  theme: 'light' | 'dark';
  language: string;
  currency: string;
}

interface IPrivacy {
  dataSharing: boolean;
  activityTracking: boolean;
  accountVisibility: boolean;
}

interface IOrder {
  deliveryInstructions: string;
  packaging: 'standard' | 'eco-friendly' | 'discreet';
}

interface IHealth {
  supplementPreferences: string[];
  healthGoals: string;
  allergies: string[];
}

interface IPayment {
  savedMethods: { type: string; last4: string }[];
}

interface IUserPreferences {
  _id: Types.ObjectId;
  account: IAccount;
  notifications: INotification;
  display: IDisplay;
  privacy: IPrivacy;
  order: IOrder;
  health: IHealth;
  payment: IPayment;
}
