import { ActionFunction } from "react-router";
import { logout } from "../server/auth.server";

export const action: ActionFunction = async ({ request }) =>
  await logout(request, { redirectTo: "/" });
