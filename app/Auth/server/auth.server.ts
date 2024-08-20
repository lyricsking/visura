import { Authenticator } from "remix-auth";
import {
  commitSession,
  getSession,
  sessionStorage,
  USER_SESSION_KEY,
} from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { AuthUser } from "../types/auth-user.type";
import { Session, redirect } from "@remix-run/node";
import { isRequest } from "~/utils/is-request";
import { IHydratedUser } from "~/User/models/user.model";

export const REDIRECT_URL = "redirect-url";
export const REDIRECT_SEARCH_PARAM = "rdr";

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
  const isAuthenticated = await authenticator.isAuthenticated(request);

  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  console.log("Redirect Url", session.get(REDIRECT_URL));

  const currentUrl = new URL(request.url);

  if (!isAuthenticated) {
    // This does not provide successRedirect, since it expects
    // isAuthenticated to be successful,
    // We must redirect back to this url after Authentication
    if (!successRedirect) {
      throw redirect(`/auth?${REDIRECT_SEARCH_PARAM}=${currentUrl.toString()}`);
    } else if (successRedirect) {
      // SuccessRedirect was provided we probably already anticipate that
      // esp in the sign in route, so we simply save the redirection url
      // and save the session so we can cache it later.
      session.set(REDIRECT_URL, successRedirect);
      if (currentUrl.pathname.includes("auth")) {
        return session;
      }
    }
  } else if (isAuthenticated && successRedirect) {
    throw redirect(successRedirect);
  } else {
    return isAuthenticated;
  }
};

export const getSessionUser = async (
  param: Request | Session
): Promise<IHydratedUser | undefined> => {
  let session: Session;
  if (isRequest(param)) {
    session = await getSession(param.headers.get("Cookie"));
  } else {
    session = param as Session;
  }
  return session.get(USER_SESSION_KEY);
};

export const setSessionUser = async (
  requestOrSession: Request | Session,
  newAuthUser: AuthUser
): Promise<Session> => {
  let session: Session;
  if (isRequest(requestOrSession)) {
    session = await getSession(requestOrSession.headers.get("Cookie"));
  } else {
    session = requestOrSession as Session;
  }

  session.set(USER_SESSION_KEY, newAuthUser);
  return session;
};

export const logout = (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => authenticator.logout(request, options);
