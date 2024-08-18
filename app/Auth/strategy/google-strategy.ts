import { GoogleStrategy } from "remix-auth-google";
import { createUser, getUser } from "~/User/server/user.server";
import { AuthUser } from "../types/auth-user.type";
import { createUserProfile } from "~/User/server/user-profile.server";
import { IUserProfile } from "~/User/types/user-profile.type";
import { login, setAuthUser } from "../server/auth.server";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    //callbackURL: "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile, request }) => {
    
    return await login(request, {
      email: profile.emails[0].value,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      photo: profile.photos[0].value,
    });
  }
);
