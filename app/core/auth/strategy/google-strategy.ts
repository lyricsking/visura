import { GoogleStrategy } from "remix-auth-google";
import {
  createUser,
  findUser,
} from "~/core/user/server/user.server";
import { setUserToSession } from "../server/auth.server";
import { AuthUser } from "../types/auth-user.type";
import { getAppContext } from "~/app";
import { UserType } from "~/core/user/models/user.model";
import { AuthorizationError } from "remix-auth";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // callbackURL: "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
    //callbackURL: "https://2tjwdf-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile, request }) => {
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const photo = profile.photos[0].value;

    // Attempt to retrieve user with the email.
    let user = await findUser({ email: email });

    const app = await getAppContext();

    if (!user) {
      const signupEnabled = app.configs("signupEnabled");
      const autoSignupEnabled = app.configs("autoSignupEnabled");

      if (!signupEnabled || !autoSignupEnabled) {
        throw new AuthorizationError(
          "You are not allowed to access this resource."
        );
      }

      console.log("No user exists with the email: %s", email);

      const userData = {
        email,
        firstName,
        lastName,
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
  }
);
