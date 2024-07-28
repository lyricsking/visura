import { Schema, model, Types, Document } from "mongoose";

// Define sub-schemas for each preference type
const NotificationSchema = new Schema({
  preferredSupportChannel: {
    type: String,
    enum: ["email", "chat", "phone"],
    required: true
  },
  orderUpdates: { type: Boolean, required: true },
  promotional: { type: Boolean, required: true },
  subscriptionReminders: { type: Boolean, required: true },
  supportNotification: { type: Boolean, required: true }
}, { _id: false });

const DisplaySchema = new Schema({
  theme: { type: String, enum: ["light", "dark"], required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true }
}, { _id: false });

const PrivacySchema = new Schema({
  dataSharing: { type: Boolean, required: true },
  activityTracking: { type: Boolean, required: true },
  accountVisibility: { type: Boolean, required: true }
}, { _id: false });

const OrderSchema = new Schema({
  deliveryInstructions: { type: String, required: true },
  packaging: { type: String, enum: ["standard", "eco-friendly", "discreet"], required: true }
}, { _id: false });

const HealthSchema = new Schema({
  supplementPreferences: { type: [String], required: true },
  healthGoals: { type: String, required: true },
  allergies: { type: [String], required: true }
}, { _id: false });

const PaymentSchema = new Schema({
  savedMethods: [{
    type: {
      type: String,
      required: true
    },
    last4: {
      type: String,
      required: true
    }
  }]
}, { _id: false });

export type UserProfileModel = Model<IUserProfile>
// Define the main user profile schema
const UserProfileSchema = new Schema<IUserProfile, UserProfileModel>({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  preferences: {
    notifications: { type: NotificationSchema, required: true },
    display: { type: DisplaySchema, required: true },
    privacy: { type: PrivacySchema, required: true },
    order: { type: OrderSchema, required: true },
    health: { type: HealthSchema, required: true },
    payment: { type: PaymentSchema, required: true }
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

const UserProfile: UserProfileModel = mongoose.models.UserProfile || mongoose.model<IUserProfile, UserProfileModel>('UserProfile', UserProfileSchema);

export default UserProfile;
