import { GoogleStrategy } from "remix-auth-google";
import { findOrCreateUserProfiles } from "~/core/User/server/user.server";
import { IUserProfile } from "~/core/User/types/user-profile.type";
import { setUserToSession } from "../server/auth.server";
import { AuthUser } from "../types/auth-user.type";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // callbackURL: "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    // callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
    callbackURL: "https://2tjwdf-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile, request }) => {
    let hydratedUser = await findOrCreateUserProfiles({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      photo: profile.photos[0].value,
      // type: 'customer'
    });

    await setUserToSession(request, hydratedUser);

    let authUser: AuthUser = {
      id: hydratedUser._id.toString(),
      email: hydratedUser.email,
    };

    return authUser;
  }
);
