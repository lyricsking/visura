import { Types } from "mongoose";
import UserProfile from "../models/user-profile.model";
import { IUserProfile } from "../types/user-profile.type";

type CreateUserProfileProps = {
  userId: Types.ObjectId,
  firstName: string,
  lastName: string,
  phone: string,
  photo?: string,
  preferences: IUserProfile['preferences']
}
// Create User Profile
export const createUserProfile = async (props: CreateUserProfileProps) => {
  const { userId, firstName, lastName, phone, photo, preferences } = props;

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
export const getProfileByUserId = async (userId: Types.ObjectId) => {
  return await UserProfile.findOne({ userId }).exec();
};

// Update User Profile
export const updateUserProfile = async (
  userId: Types.ObjectId,
  updateData: Partial<IUserProfile>
) => {
  return await UserProfile.findOneAndUpdate({ userId }, updateData, {
    new: true,
  }).exec();
};

// Delete User Profile
export const deleteUserProfile = async (userId: Types.ObjectId) => {
  return await UserProfile.findOneAndDelete({ userId }).exec();
};
