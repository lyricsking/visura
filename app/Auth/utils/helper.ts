import { TypedResponse } from "@remix-run/node";
import { AuthUser } from "../types/auth-user.type";

export const isAuthUser = (
  authUser: AuthUser | TypedResponse<null> | undefined
): authUser is AuthUser => (authUser as AuthUser).id !== undefined;
