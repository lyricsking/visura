import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import path from "path";

export const prefs = createCookie("prefs");

const sessionSecret = process.env.SESSION_SECRET || "secret";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storagePath = path.resolve(__dirname, "../sessions");

export const { getSession, commitSession, destroySession } = createFileSessionStorage({
  dir: "/app/sessions",
  //dir: storagePath,
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret], // Replace with your own secret
    secure: process.env.NODE_ENV === "production",
  },
});
