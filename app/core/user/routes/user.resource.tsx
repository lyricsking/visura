import { LoaderFunction, json } from "@remix-run/node";
import { findUser } from "../server/user.server";
import { getAuthUser } from "~/core/auth/server/auth.server";
import { isAuthUser } from "~/core/auth/utils/helper";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authUser = await getAuthUser(request);
  if (authUser && isAuthUser(authUser) && authUser.id != null) {
    let id = params["id"];
    const user = await findUser({
      fields: { email: authUser.email },
      populate: { path: "profile" },
    });

    if (user) {
      //await setAuthUser(request, user);
      return json({ user });
    }
  }

  return json(null);
};
