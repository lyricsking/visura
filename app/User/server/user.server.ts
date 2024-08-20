import {
  HydratedDocument,
  PopulateOptions,
  Types,
} from "mongoose";
import User, {
  IHydratedUser,
  IUserMethods,
  IUserVirtuals,
} from "../models/user.model";
import { IUser, UserType } from "../types/user.types";
import { Session } from "@remix-run/node";
import { IUserProfile } from "../types/user-profile.type";
import { getStaffByUserId } from "./staff.server";
import { createUserProfile } from "./user-profile.server";

export type CreateUserProps = {
  email: string;
  password?: string;
  type: UserType;
};

// Create User
export const createUser = async (props: CreateUserProps) => {
  const { email, password, type } = props;

  console.log("Creating user");

  try {
    let newUser = new User({
      email,
      ...(password && { password }),
      type,
    });

    return await newUser.save();
  } catch (error) {
    throw new Error("User could not be created");
  }
};

export const findOrCreateUserProfiles = async (
  requestOrSession: Request | Session,
  {
    firstName,
    lastName,
    email,
    photo,
    type = "customer",
  }: Pick<IUser, "email"> &
    Partial<Pick<IUser, "type">> &
    Pick<IUserProfile, "firstName" | "lastName" | "photo">
): Promise<IHydratedUser> => {
  // Attempt to retrieve user with the email and updatuing the user as active.
  let user = await updateUser(email, { isActive: true }, { path: "profile" });

  // if there is no user, then it means we do have user with that email, ensure we create one.
  if (!user) {
    user = await createUser({ email, type: type || UserType.customer });
    console.log("Created user %s", user);
  }

  // If we have user but no profile, it means there is no profile info for the user yet,
  // we create a profile using the default preferences then.
  if (!user.profile) {
    let profileData: Omit<IUserProfile, "_id"> = {
      userId: user._id,
      firstName,
      lastName,
      photo: photo,
      preferences: defaultPreferences,
    };

    const userProfile = await createUserProfile(profileData);
    console.log("Created user profile", userProfile);

    user.profile = userProfile;
  }

  // if user type is "staff", we will find the staff object and assign
  if (user.type === UserType.staff) {
    let staff = await getStaffByUserId(user.id);
    if (staff) {
      user.staff = staff;
    }
  }

  return user;
};

// Read User by Id
export const findUserById = async (
  userId: Types.ObjectId,
  populate?: PopulateOptions | PopulateOptions[]
): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals> | null> => {
  try {
    const userQuery = User.findById(userId);
    if (populate) userQuery.populate(populate);

    return await userQuery.exec();
  } catch (err) {
    throw err;
  }
};

// Read User
export const findUser = async ({
  fields,
  populate,
}: {
  fields: Partial<IUser>;
  populate?: PopulateOptions | PopulateOptions[];
}): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals> | null> => {
  try {
    const query = User.findOne(fields);
    if (populate) {
      query.populate(populate);
    }
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// Read Users
export const findUsers = async (
  fields: Partial<IUser>
): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals>[] | null> => {
  try {
    return await User.find(fields).exec();
  } catch (err) {
    throw err;
  }
};

// Update User
export const updateUser = async (
  userIdOrEmail: Types.ObjectId | string,
  updateData: Partial<IUser>,
  populate?: PopulateOptions | PopulateOptions[]
) => {
  let updatedUserQuery;
  if (typeof userIdOrEmail === "string") {
    updatedUserQuery = User.findOneAndUpdate(
      { email: userIdOrEmail },
      updateData,
      { new: true }
    );
  } else {
    updatedUserQuery = User.findByIdAndUpdate(userIdOrEmail, updateData, {
      new: true,
    });
  }

  if (populate) {
    updatedUserQuery.populate(populate);
  }
  const updatedUser = await updatedUserQuery.exec();

  if (!updatedUser) {
    throw new Error("User or profile not found");
  }

  return updatedUser;
};

// Update User Password
export const updateUserPassword = async (
  userId: Types.ObjectId,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId).exec();

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await user.isValidPassword(currentPassword);

  if (!isPasswordValid) {
    throw new Error("Password is invalid");
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
  const disabledUser = await User.findByIdAndUpdate(userId, {
    isActive: false,
  }).exec();

  if (!disabledUser) {
    throw new Error("User not found");
  }

  return disabledUser;
};

const defaultPreferences: IUserProfile["preferences"] = {
  notifications: {
    preferredSupportChannel: "whatsapp",
    orderUpdates: true,
    promotional: true,
    subscriptionReminders: true,
    supportNotification: true,
  },
  display: {
    theme: "light",
    language: "en",
    currency: "NGN",
  },
  //privacy: {
  //  dataSharing: true,
  //  activityTracking: true,
  //  accountVisibility: true,
  //},
  order: {
    deliveryInstructions: "Leave at door",
    packaging: "standard",
  },
};
