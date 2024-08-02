import { HydratedDocument, NullExpression, Types } from "mongoose";
import User, { IUserMethods, IUserVirtuals, UserModel } from "../models/user.model";
import { IUser, UserRoles } from "../types/user.types";
import connectToDatabase from "~/database/db.server";

export type CreateUserProps = {
  email: string, 
  password?: string, 
  roles: UserRoles[], 
  populate: any[]
}
// Create User
export const createUser = async (
  props: CreateUserProps
) => {
  const { email, password, roles, populate = [] } = props;

  console.log("Creating user");

  try {
    await connectToDatabase();
    
    let existingUser = await User.findOneAndUpdate({ email }, { isActive: true }, { new: true })
      .populate(populate || [])
      .exec();

    if (existingUser) {
      return existingUser;
    }

    let newUser = new User({
      email,
      ...(password && { password }),
      roles,
    });

    await newUser.save();
    /*.then(user => {
    const preferences = {
      notifications: {
        preferredSupportChannel: 'email',
        orderUpdates: true,
        promotional: true,
        subscriptionReminders: true,
        supportNotification: true,
      },
      display: {
        theme: 'light',
        language: 'en',
        currency: 'NGN',
      },
      privacy: {
        dataSharing: true,
        activityTracking: true,
        accountVisibility: true,
      },
      order: {
        deliveryInstructions: 'Leave at door',
        packaging: 'eco-friendly',
      },
    };
  });
  */

    // Query the saved user and populate the virtual field
    const user= await User.findById(newUser._id).populate(populate).exec();
    if (user) return user;
    throw new Error()
  } catch (error) {
    throw new Error("User could not be created");
  } 
};

// Read User
export const getUserById = async (
  userId: Types.ObjectId
): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals> | null> => {
  try {
    await connectToDatabase();

    return await User.findById(userId).exec();
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
  
  const isPasswordValid = await user.isPasswordValid(currentPassword);
  
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
