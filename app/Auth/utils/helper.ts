import { Session, TypedResponse } from "@remix-run/node";
import { AuthUser } from "../types/auth-user.type";

export const isAuthUser = (
  authUser: AuthUser | Session | undefined
): authUser is AuthUser => (authUser as AuthUser).id !== undefined;
