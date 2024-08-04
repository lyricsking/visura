import { HydratedDocument, NullExpression, Types } from "mongoose";
import User, { IUserMethods, IUserVirtuals, UserModel } from "../models/user.model";
import { IUser, UserRoles } from "../types/user.types";
import connectToDatabase from "~/database/db.server";

export type CreateUserProps = {
  email: string, 
  password?: string, 
  roles: UserRoles[], 
}
// Create User
export const createUser = async (
  props: CreateUserProps
) => {
  const { email, password, roles } = props;

  console.log("Creating user");

  try {
    let newUser = new User({
      email,
      ...(password && { password }),
      roles,
    });

    return await newUser.save();
  } catch (error) {
    throw new Error("User could not be created");
  } 
};

// Read User by Id
export const getUserById = async (
  userId: Types.ObjectId
): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals> | null> => {
  try {

    return await User.findById(userId).exec();
  } catch (err) {
    throw err;
  } 
};

// Read User
export const getUser = async ({
  fields,
  populate,
}: {
  fields: Partial<IUser>;
  populate?: any[];
}): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals> | null> => {
  try {
    return await User.findOne(fields).populate(populate||[]).exec();
  } catch (err) {
    throw err;
  }
};

// Read Users
export const getUsers = async (
  fields: Partial<IUser>
): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals>[] | null> => {
  try {

    return await User.find(fields).exec();
  } catch (err) {
    throw err;
  } 
};
// Update User
export const updateUser = async (userId: Types.ObjectId, updateData: Partial<IUser>) => {
  const updatedUser =  await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  
  if (!updatedUser ) {
    throw new Error('User or profile not found');
  }
  
  return updatedUser;
};

// Update User Password
export const updateUserPassword = async (userId: Types.ObjectId, currentPassword: string, newPassword: string) => {
  const user = await User.findById(userId).exec();
  
  if (!user ) {
    throw new Error('User not found');
  }
  
  const isPasswordValid = await user.isValidPassword(currentPassword);
  
  if(!isPasswordValid){
    throw new Error("Password is invalid")
  }
  
  user.password = newPassword;
  return await user.save();
};

// Delete User
export const deleteUser = async (userId: Types.ObjectId) => {
  const deletedUser = await User.findByIdAndDelete(userId).exec();

  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
};

// Disable User
export const disableUser = async (userId: Types.ObjectId) => {
  const disabledUser = await User.findByIdAndUpdate(userId, {isActive: false}).exec();

  if (!disabledUser) {
    throw new Error("User not found");
  }

  return disabledUser;
};
