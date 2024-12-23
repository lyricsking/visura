import { ActionFunction } from "@remix-run/node";
import { logout } from "../server/auth.server";

export const action: ActionFunction = async ({ request }) =>
  await logout(request, { redirectTo: "/" });
