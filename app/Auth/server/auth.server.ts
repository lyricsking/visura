import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { AuthUser } from "../types/auth-user.type";
import { Session, json, redirect } from "@remix-run/node";
import { getUser, updateUser } from "~/User/server/user.server";
import { IUser } from "~/User/types/user.types";
import { HydratedDocument } from "mongoose";
import { IUserMethods, IUserVirtuals } from "~/User/models/user.model";

export const REDIRECT_URL = "redirect-url";
export const REDIRECT_SEARCH_PARAM = "r_dr";

const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(googleStrategy);
//export { authenticator };

/**
 * Wrapper around remix-auth's authenticate method, properly handles result of the authenticator.authenticate method call.
 * @param request Request
 */
export const authenticate = async (request: Request) => {
  const user = await authenticator.authenticate("google", request, {
    failureRedirect: "/auth",
  });

  console.log("User %s", user);

  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user);

  const successRedirect = (await session.get(REDIRECT_URL)) || "/";

  session.unset(REDIRECT_URL);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  return redirect(successRedirect, { headers });
};

/**
 * An abstraction over Remix Auth authenticator, It checks if user is already authenticated and properly handles redirection, ensuring user can go back to initial page that failed authentication.
 *
 * @param request Request Request object of the current page
 * @param options Optional options to pass to authenticator
 */
export const isAuthenticated = async (
  request: Request,
  options?: {
    successRedirect?: string;
  }
) => {
  const { successRedirect } = options || {};
  const session = await getSession(request.headers.get("Cookie"));

  console.log("Redirect Url", session.get(REDIRECT_URL));

  const isAuthenticated = await authenticator.isAuthenticated(request);

  if (!isAuthenticated) {
    if (!successRedirect) {
      // This does not provide successRedirect, since expects a isAuthenticated to be successful,
      // We must redirect back to this url after Authentication

      const currentUrl = new URL(request.url);

      throw redirect(`/auth?${REDIRECT_SEARCH_PARAM}=${currentUrl.toString()}`);
    } else if (successRedirect) {
      session.set(REDIRECT_URL, successRedirect);
      const headers = {
        "Set-Cookie": await commitSession(session),
      };

      return json(isAuthenticated, { headers });
    }
  } else if (isAuthenticated && successRedirect) {
    throw redirect(successRedirect);
  } else {
    return isAuthenticated;
  }
};

export const getSessionUser = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  return session.get(authenticator.sessionKey);
};

export const setAuthUser = async (
  request: Request,
  user: HydratedDocument<IUser, IUserMethods & IUserVirtuals>
) => {
  const session = await getSession(request.headers.get("Cookie"));

  let authUser = {
    id: user.id,
    email: user.email,
    profile: user.profile,
  };

  session.set(authenticator.sessionKey, user);
  // Since the user has signed, we ensure they a marked active
  if (!user.isActive) {
    await updateUser(user._id, { isActive: true });
  }

  return json(authUser, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export const setUnauthUser = async (
  session: Session,
  user: { email: string }
) => {
  let authUser: AuthUser = {
    id: user.email,
    email: user.email,
  };

  session.set(authenticator.sessionKey, user);

  return authUser;
};

export const updateAuthUser = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  let authUser: AuthUser = session.get(authenticator.sessionKey);

  let user = await getUser({
    fields: { email: authUser.email },
    populate: { path: "profile" },
  });

  return user && (await setAuthUser(request, user));
};

export const logout = (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => authenticator.logout(request, options);
