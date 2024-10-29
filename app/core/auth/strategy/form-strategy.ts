import { FormStrategy } from "remix-auth-form";
import { findOrCreateUserProfiles } from "~/core/user/server/user.server";
import { setUserToSession } from "../server/auth.server";
import { AuthUser } from "../types/auth-user.type";
import invariant from "tiny-invariant";

export const formStrategy = new FormStrategy(async ({ form, request }) => {
  let userId = form.get("userId") as string;
  let password = form.get("password") as string;

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

  let hydratedUser = await findOrCreateUserProfiles({
    email: userId,
    password: password,
    // type: 'customer'
  });

  await setUserToSession(request, hydratedUser);

  let authUser: AuthUser = {
    id: hydratedUser._id.toString(),
    email: hydratedUser.email,
  };

  return authUser;
});
