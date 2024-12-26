import { LoaderFunction, json, redirect } from "@remix-run/node";
import { authenticate } from "../server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticate("google", request);
  return redirect("/auth");
};
