import { createCookie, createFileSessionStorage } from "@remix-run/node";
export const prefs = createCookie("prefs");
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, "./");
console.log(storagePath);

export const USER_SESSION_KEY = "_user";

const sessionSecret = process.env.SESSION_SECRET || "secret";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const sessionStorage  = createFileSessionStorage({
  dir: "../sessions",
  //dir: storagePath,
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    //maxAge: 10 , // 1 minutes
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret], // Replace with your own secret
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;