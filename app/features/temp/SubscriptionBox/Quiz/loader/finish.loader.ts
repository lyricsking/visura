import { json, LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/core/auth/server/auth.server";
import { IHydratedUser } from "~/core/user/models/user.model";

export const loader: LoaderFunction = async ({ request }) => {
  let user: IHydratedUser | undefined = await getUserFromSession(request);

  return json({ user: user });
};
