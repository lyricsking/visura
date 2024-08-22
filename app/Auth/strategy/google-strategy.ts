import { GoogleStrategy } from "remix-auth-google";
import { findOrCreateUserProfiles } from "~/User/server/user.server";
import { IUserProfile } from "~/User/types/user-profile.type";
import { setCacheUser } from "../server/auth.server";
import { AuthUser } from "../types/auth-user.type";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL:
      "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    //callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile, request }) => {
    let hydratedUser = await findOrCreateUserProfiles({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      photo: profile.photos[0].value,
      // type: 'customer'
    });

    await setCacheUser(request, hydratedUser);

    let authUser: AuthUser = {
      id: hydratedUser._id.toString(),
      email: hydratedUser.email,
    };

    return authUser;
  }
);
