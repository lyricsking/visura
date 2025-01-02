import mongoose, { Schema, Model, HydratedDocument, Types } from "mongoose";
import bcrypt from "bcrypt";
import { IUserMeta } from "./user-meta.model";
import { IStaff } from "./staff.model";
import { IUser, UserType } from "~/core/types/user";

export interface IUserMethods {
  isValidPassword(password: string): Promise<boolean>;
  hasPassword(): boolean;
}

export interface IUserVirtuals {
  meta?: IUserMeta;
  staff: IStaff;
}

export type UserModel = Model<IUser, {}, IUserMethods, IUserVirtuals>;

// Create the Mongoose schema
const userSchema = new Schema<
  IUser,
  UserModel,
  IUserMethods,
  {},
  IUserVirtuals
>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: { type: String },
    photo: { type: String },
    password: {
      type: String,
      minlength: 6,
    },
    type: {
      type: String,
      enum: Object.values(UserType),
      default: "customer",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware to hash password before saving user document
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Middleware to update the `updatedAt` field on every save
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to check password validity
userSchema.method(
  "isValidPassword",
  async function isValidPassword(password: string): Promise<boolean> {
    return (this.password && bcrypt.compare(password, this.password)) || false;
  }
);

// Instance method to check password validity
userSchema.method("hasPassword", function hasPassword(): boolean {
  return !!this.password;
});

// Virtual for user's metadata
userSchema.virtual("metadata", {
  ref: "UserProfile",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

// Virtual for user's staff
userSchema.virtual("staff", {
  ref: "Staff",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

export type IHydratedUser = HydratedDocument<
  IUser,
  IUserMethods & IUserVirtuals
>;
// Create and export the User model
const User: UserModel =
  mongoose.models.User || mongoose.model<IUser, UserModel>("User", userSchema);
export default User;
