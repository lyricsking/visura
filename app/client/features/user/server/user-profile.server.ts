import { Types } from "mongoose";
import UserMeta from "../models/user-meta.model";
import { IUserMeta } from "../types/user-meta.type";
import { HydratedDocument } from "mongoose";

type PreferencesKeys = keyof IUserMeta["preferences"];

// Create User Profile
export const createUserProfile = async (
  props: Partial<IUserMeta>
): Promise<IUserMeta> => {
  const { userId, firstName, lastName, phone, photo, preferences } = props;
  console.log("Creating profile");

  const newUserProfile = new UserMeta({
    userId,
    firstName,
    lastName,
    phone,
    photo,
    preferences,
  });
  return await newUserProfile.save();
};

// Read User Profile
export const getProfileByUserId = async (
  userId: Types.ObjectId
): Promise<HydratedDocument<IUserMeta> | null> => {
  try {
    return await UserMeta.findOne({ userId }).exec();
  } catch (error) {
    throw error;
  }
};

// Update User
export const updateUserProfile = async (
  userId: Types.ObjectId,
  updateData: Partial<IUserMeta>
) => {
  return await UserMeta.findOneAndUpdate({ userId }, updateData, {
    new: true,
  }).exec();
};

// Update User preferences
export const updateUserPreference = async <T extends PreferencesKeys>(
  userId: Types.ObjectId,
  preferenceKey: T,
  updateData: IUserMeta["preferences"][T]
) => {
  // Use dynamic path to update the specific field in preferences
  const update = { [`preferences.${preferenceKey}`]: updateData };

  return await UserMeta.findOneAndUpdate(
    { userId },
    update,
    { new: true } // Return the updated document
  ).exec();
};

// Delete User Profile
export const deleteUserProfile = async (userId: Types.ObjectId) => {
  return await UserMeta.findOneAndDelete({ userId }).exec();
};
