export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Here you can save the user information in the database
    return profile;
  }
);