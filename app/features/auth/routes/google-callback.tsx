import { LoaderFunction, json, redirect } from "react-router";
import { authenticate } from "../server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticate("google", request);
  return redirect("/auth");
};
