import { LoaderFunction, json } from "@remix-run/node";
import { Types } from "mongoose";
import { getAuthUser } from "~/Auth/server/auth.server";
import { isAuthUser } from "~/Auth/utils/helper";
import { findUser } from "../server/user.server";

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
