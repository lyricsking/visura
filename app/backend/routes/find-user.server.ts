import { LoaderFunction, json } from "@remix-run/node";
import { findUser } from "../../client/features/user/server/user.server";
import { getAuthenticatedUser } from "~/core/auth/server/auth.server";
import { isAuthUser } from "~/core/auth/utils/helper";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authUser = await getAuthenticatedUser(request);
  if (authUser && isAuthUser(authUser) && authUser.id != null) {
  }

  return json(null);
};
