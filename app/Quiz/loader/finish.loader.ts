import { json, LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/Auth/server/auth.server";
import { IHydratedUser } from "~/User/models/user.model";

export const loader: LoaderFunction = async ({ request }) => {
  let user: IHydratedUser | undefined = await getUserFromSession(request);

  return json({ user: user });
};
