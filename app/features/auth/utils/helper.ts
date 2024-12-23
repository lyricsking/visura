import { Session, TypedResponse } from "react-router";
import { AuthUser } from "../types/auth-user.type";

export const isAuthUser = (authUser: any): authUser is AuthUser =>
  (authUser as AuthUser).id !== undefined;

export const isSessionInstance = (
  authUser: AuthUser | Session | undefined
): authUser is Session => typeof (authUser as Session).has === "function";
