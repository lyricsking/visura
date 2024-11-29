import { HydratedDocument, PopulateOptions, Types } from "mongoose";
import User, {
  IHydratedUser,
  IUser,
  IUserMethods,
  IUserVirtuals,
  UserType,
} from "../models/user.model";
import { IUserMeta } from "../models/user-meta.model";
import { Session } from "@remix-run/node";
import {
  getSession,
  USER_SESSION_KEY,
  commitSession,
} from "~/core/utils/session";

export type CreateUserProps = {
  email: string;

  password?: string;
  type: UserType;
};

// Create User
export const createUser = async (props: Partial<IUser>) => {
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

export const getUserFromSession = async (
  requestOrSession: Request | Session
): Promise<IHydratedUser | undefined> => {
  const session: Session = await getSession(requestOrSession);

  return session.get(USER_SESSION_KEY);
};

export const setUserToSession = async (
  requestOrSession: Request | Session,
  newUser: IHydratedUser
): Promise<void> => {
  const session = await getSession(requestOrSession);

  session.set(USER_SESSION_KEY, newUser);
  await commitSession(session);
};

export const invalidateCacheUser = async (
  requestOrSession: Request | Session
) => {
  const session = await getSession(requestOrSession);

  return session.unset(USER_SESSION_KEY);
};

export const getUserOrFetch = (request: Request, email: string) => {
  return (
    getUserFromSession(request) ||
    User.findOne({ email })
      .populate({ path: "meta" })
      .exec()
      .then((user) => {
        if (user) setUserToSession(request, user);
      })
  );
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
export const findUser = async (
  fields: Partial<IUser>,
  populate?: PopulateOptions | PopulateOptions[]
): Promise<HydratedDocument<IUser, IUserMethods & IUserVirtuals> | null> => {
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

  //  if (!updatedUser) {
  //    throw new Error("User or profile not found");
  //  }

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

const defaultPreferences: IUserMeta[] = [
  {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    metaKey: "notifications",
    metaValue: {
      preferredSupportChannel: "whatsapp",
      orderUpdates: true,
      promotional: true,
      subscriptionReminders: true,
      supportNotification: true,
    },
  },
  {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    metaKey: "display",
    metaValue: {
      theme: "light",
      language: "en",
      currency: "NGN",
    },
  },
  //privacy: {
  //  dataSharing: true,
  //  activityTracking: true,
  //  accountVisibility: true,
  //},
  {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    metaKey: "order",
    metaValue: {
      deliveryInstructions: "Leave at door",
      packaging: "standard",
    },
  },
];
