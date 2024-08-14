import { LoaderFunction, json } from "@remix-run/node";
import { Types } from "mongoose";
import { getSessionUser, isAuthenticated } from "~/Auth/server/auth.server";
import { getUserById } from "../server/user.server";
import { AuthUser } from "~/Auth/types/auth-user.type";
import { isAuthUser } from "~/Auth/utils/helper";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authUser = await getSessionUser(request);
  if (authUser && isAuthUser(authUser) && authUser.id != null) {
    let id = params["id"];
    const user = await getUserById(new Types.ObjectId(authUser.id), {
      path: "profile",
    });

    if (user) {
      return json({ user });
    }
  }

  return json(null);
};
