import mongoose, { Schema, Model, Types, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserRoles } from "../types/user.types";
import { IUserProfile } from "../types/user-profile.type";

export interface IUserMethods {
  isValidPassword(password: string): Promise<boolean>;
}

export interface IUserVirtuals {
  profile: IUserProfile;
}

export type UserModel = Model<IUser, {}, IUserMethods, IUserVirtuals>;

// Create the Mongoose schema
const UserSchema = new Schema<
  IUser,
  UserModel,
  IUserMethods,
  {},
  IUserVirtuals
>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    hasPassword: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minlength: 6,
    },
    roles: {
      type: [String],
      enum: Object.values(UserRoles),
      default: ["user"],
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
UserSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Middleware to update the `updatedAt` field on every save
UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to check password validity
UserSchema.method(
  "isValidPassword",
  async function isValidPassword(password: string): Promise<boolean> {
    return (this.password && bcrypt.compare(password, this.password)) || false;
  }
);

// Virtual for user's profile
UserSchema.virtual("profile", {
  ref: "UserProfile",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

// Create and export the User model
const User: UserModel =
  mongoose.models.User || mongoose.model<IUser, UserModel>("User", UserSchema);
export default User;
