import { ActionFunction } from "@remix-run/node";
import { logout } from "../../../../core/auth/server/auth.server";

export const action: ActionFunction = async ({ request }) =>
  await logout(request, { redirectTo: "/" });
