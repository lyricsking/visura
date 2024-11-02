import { FormStrategy } from "remix-auth-form";
import { createUser, setUserToSession } from "~/core/user/server/user.server";
import { AuthUser } from "../types/auth-user.type";
import { AuthorizationError } from "remix-auth";
import { getAppContext } from "~/app";
import User, { UserType } from "~/core/user/models/user.model";
import invariant from "tiny-invariant";

export const formStrategy = new FormStrategy(async ({ form, request }) => {
  let userId = form.get("userId") as string;
  let password = form.get("password") as string;

  if (typeof userId !== "string") {
    throw new Response("UserId must be a valid string.", {
      status: 400,
    });
  }

  if (userId.length === 0) {
    throw new Response("UserId cannot be empty.", {
      status: 400,
    });
  }

  // Determine userId type with regex
  if (typeof password !== "string") {
    throw new Response("Password cannot be empty.", {
      status: 400,
    });
  }

  if (password.length === 0) {
    throw new Response("Password must be longer than 6 characters.", {
      status: 400,
    });
  }

  // Attempt to retrieve user with the email.
  let user = await User.findOne({ $or: [{ email: userId, phone: userId }] });

  const app = await getAppContext();

  if (!user) {
    const signupEnabled = app.configs("signupEnabled");
    const autoSignupEnabled = app.configs("autoSignupEnabled");

    invariant(
      signupEnabled && autoSignupEnabled,
      "You are not allowed to access this resource."
    );
    if (!signupEnabled || !autoSignupEnabled) {
      throw new Response("You are not allowed to access this resource.", {
        status: 401,
      });
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

  console.log(authUser);
  return authUser;
});
