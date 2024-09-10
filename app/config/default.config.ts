import { Config } from ".";

export const config: Config = {
  appName: "HarmonySport.",
  description: "Subscription  based health store.",
  adminDashboardPath: "administration",
  blogPath: "blog",
  copyrightText: "HarmonyBlog",
  userDashboardPath: "account",
  plugins: {
    LandingPage: { enabled: true },
  },
};
