import { GoogleStrategy } from "remix-auth-google";
import { createUser } from "~/User/server/user.server";
import { AuthUser } from "../types/auth-user.type";
import {
  IUserMethods,
  IUserVirtuals,
  UserModel,
} from "~/User/models/user.model";
import { IUser } from "~/User/types/user.types";
import { HydratedDocument } from "mongoose";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    //callbackURL: "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log(profile);
    // Create or retrieve user with the primary email
    let user = await createUser({
      email: profile.emails[0].value,
      roles: ["user"],
      populate: [
        {
          path: "profile",
          select: "firstname lastname",
        },
      ],
    });
    if (user) {
      let authUser: AuthUser = {
        id: user._id.toString(),
        email: user.email,
      };
      return authUser;
    }
  }
);
