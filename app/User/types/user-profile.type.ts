import { Schema, model, Types, Document } from "mongoose";

interface INotification {
  preferredSupportChannel: "email" | "chat" | "phone";
  orderUpdates: boolean;
  promotional: boolean;
  subscriptionReminders: boolean;
  supportNotification: boolean;
}

interface IDisplay {
  theme: "light" | "dark";
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
  packaging: "standard" | "eco-friendly" | "discreet";
}

interface IHealth {
  supplementPreferences?: string[];
  healthGoals?: string;
  allergies?: string[];
}

export interface IUserProfile {
  _id: Types.ObjectId;
  userId: Types.ObjectId;  // Reference to the IUser
  firstName: string;
  lastName: string;
  phone: string;
  photo: string;
  preferences: {
    notifications: INotification;
    display: IDisplay;
    privacy: IPrivacy;
    order: IOrder;
    health?: IHealth;
  };
}