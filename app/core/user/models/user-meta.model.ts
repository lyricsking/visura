import mongoose, { Schema, Model, Types, Document } from "mongoose";

interface INotification {
  preferredSupportChannel: "whatsapp";
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
  packaging: "standard";
}

interface IHealth {
  supplementPreferences?: string[];
  healthGoals?: string;
  allergies?: string[];
}

export interface IUserMeta {
  _id: Types.ObjectId;
  userId: Types.ObjectId; // Reference to the IUser
  metaKey: string;
  metaValue: any;
}

// Define sub-schemas for each preference type
const NotificationSchema = new Schema(
  {
    preferredSupportChannel: {
      type: String,
      enum: ["whatsapp"],
      required: true,
      default: "whatsapp",
    },
    orderUpdates: { type: Boolean, required: true, default: true },
    promotional: { type: Boolean, required: true, default: true },
    subscriptionReminders: { type: Boolean, required: true, default: true },
    supportNotification: { type: Boolean, required: true, default: true },
  },
  { _id: false }
);

const DisplaySchema = new Schema(
  {
    theme: { type: String, enum: ["light", "dark"], required: true },
    language: { type: String, required: true },
    currency: { type: String, required: true },
  },
  { _id: false }
);

const PrivacySchema = new Schema(
  {
    dataSharing: { type: Boolean, required: true },
    activityTracking: { type: Boolean, required: true },
    accountVisibility: { type: Boolean, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    deliveryInstructions: { type: String, required: true },
    packaging: {
      type: String,
      enum: ["standard", "eco-friendly", "discreet"],
      required: true,
    },
  },
  { _id: false }
);

const HealthSchema = new Schema(
  {
    supplementPreferences: { type: [String], required: true },
    healthGoals: { type: String, required: true },
    allergies: { type: [String], required: true },
  },
  { _id: false }
);

const PaymentSchema = new Schema(
  {
    savedMethods: [
      {
        type: {
          type: String,
          required: true,
        },
        last4: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { _id: false }
);

export type UserMetaModel = Model<IUserMeta>;
// Define the main user profile schema
const userMetaSchema = new Schema<IUserMeta, UserMetaModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metaKey: { type: String, required: true },
    metaValue: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const UserMeta: UserMetaModel =
  mongoose.models.UserProfile ||
  mongoose.model<IUserMeta, UserMetaModel>("UserMeta", userMetaSchema);

export default UserMeta;
