import { FormStrategy } from "remix-auth-form";
import {
  createUser,
} from "~/core/user/server/user.server";
import { setUserToSession } from "../server/auth.server";
import { AuthUser } from "../types/auth-user.type";
import { AuthorizationError } from "remix-auth";
import { getAppContext } from "~/app";
import User, { UserType } from "~/core/user/models/user.model";

export const formStrategy = new FormStrategy(async ({ form, request }) => {
  let userId = form.get("userId") as string;
  let password = form.get("password") as string;

  if (typeof userId !== "string") {
    throw new Error("UserId must be a valid string.");
  }

  if (userId.length === 0) {
    throw new Error("UserId cannot be empty.");
  }

  // Determine userId type with regex

  if (typeof password !== "string") {
    throw new Error("Password cannot be empty.");
  }

  if (password.length === 0) {
    throw new Error("Password must be longer than 6 characters.");
  }

  // Attempt to retrieve user with the email.
  let user = await User.findOne({ $or: [{ email: userId, phone: userId }] });

  const app = await getAppContext();

  if (!user) {
    const signupEnabled = app.configs("signupEnabled");
    const autoSignupEnabled = app.configs("autoSignupEnabled");

    if (!signupEnabled || !autoSignupEnabled) {
      throw new AuthorizationError(
        "You are not allowed to access this resource."
      );
    }

    console.log("No user exists with the userId: %s", userId);

    const userData = {
      email: userId,
      password: password,
      type: UserType.customer,
    };

    console.log("Creating new user with: %s", userData);

    user = await createUser(userData);

    console.log("Created user %s", user);
  }

  await setUserToSession(request, user);

  let authUser: AuthUser = {
    id: user._id.toString(),
    email: user.email,
  };

  return authUser;
});
