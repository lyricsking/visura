import { LoaderFunction, json } from "@remix-run/node";
import { Types } from "mongoose";
import { getSessionUser } from "~/Auth/server/auth.server";
import { getUser } from "../server/user.server";
import { isAuthUser } from "~/Auth/utils/helper";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authUser = await getSessionUser(request);
  if (authUser && isAuthUser(authUser) && authUser.id != null) {
    let id = params["id"];
    const user = await getUser({
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
