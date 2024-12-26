import { ActionFunction } from "@remix-run/node";
import { logout } from "../../../../shared/auth/server/auth.server";

export const action: ActionFunction = async ({ request }) =>
  await logout(request, { redirectTo: "/" });
