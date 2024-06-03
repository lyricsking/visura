import { createCookie, createCookieSessionStorage } from "@remix-run/node";

export const prefs = createCookie("prefs");

export const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const cookieStorage = createCookieSessionStorage({
  cookie: {
    name: "linked_cookie",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});