import { createCookie, createCookieSessionStorage } from "@remix-run/node";

export const prefs = createCookie("prefs");

const sessionSecret = process.env.SESSION_SECRET || "secret";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
      secure: process.env.NODE_ENV === "production",
      maxAge: 60,
    },
  });
