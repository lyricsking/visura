import { Session, TypedResponse } from "@remix-run/node";
import { AuthUser } from "../types/auth-user.type";
import { IUser } from "~/core/types/user";

export const isAuthUser = (authUser: any): authUser is AuthUser =>
  (authUser as AuthUser).id !== undefined;

export const isSessionInstance = (
  authUser: AuthUser | Session | undefined
): authUser is Session => typeof (authUser as Session).has === "function";

export async function cacheUserInstance(request: Request, user: IUser) {}
