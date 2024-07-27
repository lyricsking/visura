import { Schema, model, Types, Document } from 'mongoose';

const AccountSchema = new Schema<IAccount>({
  _id: false,
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true }
});

const NotificationSchema = new Schema<INotification>({
  _id: false,
  preferredSupportChannel: { type: String, enum: ['email', 'chat', 'phone'], required: true },
  orderUpdates: { type: Boolean, required: true },
  promotional: { type: Boolean, required: true },
  subscriptionReminders: { type: Boolean, required: true },
  supportNotification: { type: Boolean, required: true }
});

const DisplaySchema = new Schema<IDisplay>({
  _id: false,
  theme: { type: String, enum: ['light', 'dark'], required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true }
});

const PrivacySchema = new Schema<IPrivacy>({
  _id: false,
  dataSharing: { type: Boolean, required: true },
  activityTracking: { type: Boolean, required: true },
  accountVisibility: { type: Boolean, required: true }
});

const OrderSchema = new Schema<IOrder>({
  _id: false,
  deliveryInstructions: { type: String, required: true },
  packaging: { type: String, enum: ['standard', 'eco-friendly', 'discreet'], required: true }
});

const HealthSchema = new Schema<IHealth>({
  _id: false,
  supplementPreferences: { type: [String], required: true },
  healthGoals: { type: String, required: true },
  allergies: { type: [String], required: true }
});

const PaymentSchema = new Schema<IPayment>({
  _id: false,
  savedMethods: [
    {
      type: {
        type: String,
        required: true
      },
      last4: {
        type: String,
        required: true
      }
    }
  ]
});

export type UserPreferencesModel = Model<IUserPreferences>;

const UserPreferencesSchema = new Schema<IUserPreferences>({
  account: { type: AccountSchema, required: true },
  notifications: { type: NotificationSchema, required: true },
  display: { type: DisplaySchema, required: true },
  privacy: { type: PrivacySchema, required: true },
  order: { type: OrderSchema, required: true },
  health: { type: HealthSchema, required: true },
  payment: { type: PaymentSchema, required: true }
});

const UserPreferences: UserPreferencesModel = mongoose.models.UserPreferences || model<IUserPreferences>('UserPreferences', UserPreferencesSchema);

export default UserPreferences;
