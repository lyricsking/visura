import { GoogleStrategy } from "remix-auth-google";
import { createUser, getUser } from "~/User/server/user.server";
import { AuthUser } from "../types/auth-user.type";
import {
  IUserMethods,
  IUserVirtuals,
  UserModel,
} from "~/User/models/user.model";
import { IUser } from "~/User/types/user.types";
import { HydratedDocument, Types } from "mongoose";
import { createUserProfile, getProfileByUserId } from "~/User/server/user-profile.server";
import { IUserProfile } from "~/User/types/user-profile.type";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    //callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log(profile);
    // Create or retrieve user with the primary email
    let user = await getUser({
      fields: { email: profile.emails[0].value },
      populate: [
        {
          path: "profile",
          select: "firstname lastname",
        },
      ],
    });

    if (!user) {
      user = await createUser({
        email: profile.emails[0].value,
        roles: ["user"],
      }).then(async (user) => {
        const userProfile: Partial<IUserProfile> = {
          userId: user._id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          photo: profile.photos[0].value,
          preferences: {
            notifications: {
              preferredSupportChannel: "email",
              orderUpdates: true,
              promotional: true,
              subscriptionReminders: true,
              supportNotification: true,
            },
            display: {
              theme: "light",
              language: "en",
              currency: "NGN",
            },
            //privacy: {
            //  dataSharing: true,
            //  activityTracking: true,
            //  accountVisibility: true,
            //},
            order: {
              deliveryInstructions: "Leave at door",
              packaging: "eco-friendly",
            },
          },
        };

        await createUserProfile(userProfile);
        return user;
      });
    }
    

    if (user) {
      let authUser: AuthUser = {
        id: user._id.toString(),
        email: user.email,
      };
      return authUser;
    }
  }
);
