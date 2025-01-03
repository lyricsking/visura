import { GoogleStrategy } from "remix-auth-google";
import doenv from "dotenv";
import { getAppContext } from "~/app";
import { UserType } from "~/core/types/user";
import { AuthUser } from "../types/auth-user.type";
import User from "~/backend/models/user.model";
import { cacheUserInstance } from "../utils/helper";
doenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL:
      "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu116.gitpod.io/auth/google/callback",
    // callbackURL: "https://ynm7f3-3000.csb.app/auth/google/callback",
    //callbackURL: "https://2tjwdf-3000.csb.app/auth/google/callback",
  },
  async ({}) => {}
);
