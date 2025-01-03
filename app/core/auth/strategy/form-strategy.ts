import { FormStrategy } from "remix-auth-form";
import { getAppContext } from "~/app";
import User from "~/backend/models/user.model";
import { UserType } from "~/core/types/user";
import { AuthUser } from "../types/auth-user.type";

export const formStrategy = new FormStrategy(async ({ form, request }) => {
  let userId = form.get("userId") as string;
  let password = form.get("password") as string;

  // Determine userId type with regex
  if (typeof userId !== "string") {
    throw new Error("UserId must be a valid string.");
  }

  if (userId.length === 0) {
    throw new Error("UserId cannot be empty.");
  }

  if (typeof password !== "string") {
    throw new Error("Password cannot be empty.");
  }

  if (password.length === 0) {
    throw new Error("Password must be longer than 6 characters.");
  }

  // Attempt to retrieve user with the email.
  let user = await User.findOne({ $or: [{ email: userId, phone: userId }] });

  // const app = await getAppContext();

  if (!user) {
    throw new Error(
      "You are not authorized to access this resource. Please log in and try again."
    );
  }

  let authUser: AuthUser = {
    id: user._id.toString(),
    email: user.email,
  };

  return authUser;
});
