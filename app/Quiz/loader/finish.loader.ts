import { json, LoaderFunction } from "@remix-run/node";
import { getSessionUser } from "~/Auth/server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getSessionUser(request);

  return json({ user });
};
