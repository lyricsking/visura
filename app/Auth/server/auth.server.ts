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
 * Wrapper around remix-auth's authenticate method, properly handles result
 * of the authenticator.authenticate method call.
 *
 * @param request Request
 */
export const authenticate = async (request: Request) => {
  const user = await authenticator.authenticate("google", request, {
    failureRedirect: "/auth",
  });

  const successRedirect = (await session.get(REDIRECT_URL)) || "/";

  session.unset(REDIRECT_URL);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  return redirect(successRedirect, { headers });
};

/**
 * An abstraction over Remix Auth authenticator, It checks if user is already
 * authenticated and properly handles redirection, ensuring user can go back
 * to initial page that failed authentication.
 *
 * @param requestOrSession Request Request object of the current page
 * @param options Optional options to pass to authenticator
 */
export const isAuthenticated = async (requestOrSession: Request | Session) => {
  const isAuthenticated = await authenticator.isAuthenticated(requestOrSession);

  const session = await getSession(requestOrSession);
  console.log("Redirect Url", session.get(REDIRECT_URL));

  const currentUrl = new URL(
    isRequest(requestOrSession) ? requestOrSession.url : "/"
  );

  if (isAuthenticated) {
    return isAuthenticated;
  }

  if (currentUrl.pathname.includes("auth")) {
    const rdrPath = currentUrl.searchParams.get(REDIRECT_SEARCH_PARAM) || "/";

    session.set(REDIRECT_URL, rdrPath);
    await commitSession(session);
    return;
  } else {
    // This does not provide successRedirect, since it expects
    // isAuthenticated to be successful,
    // We will redirect to authenticate and the redirect back to this current url after Authentication
    return `/auth?${REDIRECT_SEARCH_PARAM}=${currentUrl.toString()}`;
  }
};

export const getAuthUser = async (
  requestOrSession: Request | Session
): Promise<AuthUser | undefined> => {
  const session: Session = await getSession(requestOrSession);

  return session.get(authenticator.sessionKey);
};

export const setAuthUser = async (
  requestOrSession: Request | Session,
  newAuthUser: AuthUser
): Promise<void> => {
  const session = await getSession(requestOrSession);
  session.set(authenticator.sessionKey, newAuthUser);

  await commitSession(session);
};

export const getUserFromSession = async (
  requestOrSession: Request | Session
): Promise<IHydratedUser | undefined> => {
  const session: Session = await getSession(requestOrSession);

  return session.get(USER_SESSION_KEY);
};

export const setUserToSession = async (
  requestOrSession: Request | Session,
  newUser: IHydratedUser
): Promise<void> => {
  const session = await getSession(requestOrSession);

  session.set(USER_SESSION_KEY, newUser);
  await commitSession(session);
};

export const invalidateCacheUser = async ( 
  requestOrSession: Request | Session
) => {
  const session = await getSession(requestOrSession);

  return session.unset(USER_SESSION_KEY);
};

export const logout = (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => authenticator.logout(request, options);
