import { createCookie, createFileSessionStorage } from "@remix-run/node";
export const prefs = createCookie("prefs");
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, "./");
console.log(storagePath);

const sessionSecret = process.env.SESSION_SECRET || "secret";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const { getSession, commitSession, destroySession } = createFileSessionStorage({
  dir: "../sessions",
  //dir: storagePath,
  cookie: {
    name: "__session",
    httpOnly: true,
    //maxAge: 60 * 60 * 24, // 1 day
    //maxAge: 60 , // 1 minutes
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret], // Replace with your own secret
    secure: process.env.NODE_ENV === "production",
  },
});
