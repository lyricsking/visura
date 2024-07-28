import { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserMethods {
  isValidPassword(): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>

// Create the Mongoose schema
const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  roles: {
    type: [String],
    enum: ['user', 'admin', 'support'],
    default: ['user'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to hash password before saving user document
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Middleware to update the `updatedAt` field on every save
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to check password validity
UserSchema.methods("isValidPassword", async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
});

// Create and export the User model
const User: UserModel = mongoose.models.User || mongoose.model<IUser, UserModel>('User', UserSchema);
export default User;
