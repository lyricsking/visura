import { Types } from "mongoose";
import UserProfile from "../models/user-profile.model";
import { IUserProfile } from "../types/user-profile.type";
import { HydratedDocument } from "mongoose";
import connectToDatabase from "~/database/db.server";

type PreferencesKeys = keyof IUserProfile["preferences"];

// Create User Profile
export const createUserProfile = async (
  props: Partial<IUserProfile>
): Promise<IUserProfile> => {
  const { userId, firstName, lastName, phone, photo, preferences } = props;
  console.log("Creating profile");

  const newUserProfile = new UserProfile({
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
): Promise<HydratedDocument<IUserProfile> | null> => {
  try {
    await connectToDatabase();

    return await UserProfile.findOne({ userId }).exec();
  } catch (error) {
    throw error;
  }
};

// Update User
export const updateUserProfile = async (
  userId: Types.ObjectId,
  updateData: Partial<IUserProfile>
) => {
  return await UserProfile.findOneAndUpdate({ userId }, updateData, {
    new: true,
  }).exec();
};
// Update User preferences
export const updateUserPreference = async <T extends PreferencesKeys>(
  userId: Types.ObjectId,
  preferenceKey: T,
  updateData: IUserProfile["preferences"][T]
) => {
  // Use dynamic path to update the specific field in preferences
  const update = { [`preferences.${preferenceKey}`]: updateData };

  const x = await UserProfile.findOneAndUpdate(
    { userId },
    update,
    { new: true } // Return the updated document
  ).exec();

  console.log("x", x);
  return x;
};

// Delete User Profile
export const deleteUserProfile = async (userId: Types.ObjectId) => {
  return await UserProfile.findOneAndDelete({ userId }).exec();
};