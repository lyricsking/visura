import { FormStrategy } from "remix-auth-form";
import { findOrCreateUserProfiles } from "~/core/user/server/user.server";
import { setUserToSession } from "../server/auth.server";
import { AuthUser } from "../types/auth-user.type";
import invariant from "tiny-invariant";

export const formStrategy = new FormStrategy(async ({ form, request }) => {
  let userId = form.get("userId") as string;
  let password = form.get("password") as string;

  invariant(typeof userId === "string", "UserId must be a valid string.");
  invariant(userId.length > 0, "UserId cannot be empty.");

  invariant(typeof password === "string", "Password cannot be empty.");
  invariant(password.length > 0, "Password cannot be empty.");

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
