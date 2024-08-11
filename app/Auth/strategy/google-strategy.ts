import { GoogleStrategy } from "remix-auth-google";
import { createUser, getUser } from "~/User/server/user.server";
import { AuthUser } from "../types/auth-user.type";
import { createUserProfile } from "~/User/server/user-profile.server";
import { IUserProfile } from "~/User/types/user-profile.type";
import { setAuthUser } from "../server/auth.server";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    //callbackURL: "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
    callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile, request }) => {
    // Create or retrieve user with the primary email
    let user = await getUser({
      fields: { email: profile.emails[0].value },
      populate: { path: "profile" },
    });

    if (!user) {
      user = await createUser({
        email: profile.emails[0].value,
        roles: ["user"],
      });
      console.log("Created user %s", user);
    }
    if (user && !user.profile) {
      const profileData: Partial<IUserProfile> = {
        userId: user._id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        photo: profile.photos[0].value,
        preferences: {
          notifications: {
            preferredSupportChannel: "whatsapp",
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
            packaging: "standard",
          },
        },
      };

      const userProfile = await createUserProfile(profileData);
      console.log(
        "Created user profile %s for userId %s",
        userProfile,
        user.id
      );
      user.profile = userProfile;
    }

    console.log("User fetched with id %s", user!.id);

    return setAuthUser(request, user).then((res) => res.json());
  }
);
