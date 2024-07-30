import {GoogleStrategy} from "remix-auth-google";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL:
      "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu115.gitpod.io/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log(profile);
    // Create or retrieve user with the primary email
    let user = await createUser(profile.emails[0].value, null, [
      {
        path: "profile",
        select: "firstname lastname"
      }
      ]);
    
    let authUser: AuthUser = {
      id: user._id.toString(),
      email: user.email,
      displayName: user.profile.firstname && user.profile.lastname 
      ? user.profile.firstname + " " + user.profile.lastname
      : null,
      photo: user.profile.photo||null,
    }
    
    return authUser;
  }
);