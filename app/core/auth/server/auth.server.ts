import { Authenticator, AuthorizationError } from "remix-auth";
import {
  commitSession,
  getSession,
  sessionStorage,
} from "~/core/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { formStrategy } from "../strategy/form-strategy";
import { AuthUser } from "../types/auth-user.type";
import { redirect, Session } from "@remix-run/node";
import { handleResponse } from "~/core/utils/helpers";
import { isAuthUser } from "../utils/helper";

export const REDIRECT_URL = "redirect-url";
export const REDIRECT_SEARCH_PARAM = "rdr";
export const authErrorKey = "auth-error";

const StrategyType = ["google", "form"] as const;
type StrategyType = (typeof StrategyType)[number];

export const authenticator = new Authenticator<AuthUser>(sessionStorage, {
  sessionErrorKey: authErrorKey,
  throwOnError: true,
});

authenticator.use(formStrategy);
authenticator.use(googleStrategy);

export const getAuthErrorKey = () => authenticator.sessionErrorKey;

//export { authenticator };

/**
 * Wrapper around remix-auth's authenticate method, properly handles result
 * of the authenticator.authenticate method call.
 *
 * @param request Request
 */
export const authenticate = async (
  strategy: StrategyType,
  request: Request
) => {
  const authUser = await authenticator.authenticate(strategy, request);

  const session = await getSession(request);
  if (isAuthUser(authUser)) await setAuthUser(session, authUser);

  return authUser;
};

/**
 * An abstraction over Remix Auth authenticator, It checks if user is already
 * authenticated and properly handles redirection, ensuring user can go back
 * to initial page that failed authentication.
 *
 * @param request `Request` object of the current page
 * @param options Optional options to pass to authenticator
 *
 * @returns `Promise<AuthUser | null>`
 */
export const isAuthenticated = async (
  request: Request,
  shouldRedirect: boolean = false
): Promise<AuthUser | null> => {
  const authRes = await authenticator.isAuthenticated(request);

  if (!authRes) {
    const session = await getSession(request);
    const currentUrl = new URL(request.url);
    session.set(REDIRECT_URL, currentUrl);

    session.flash(
      authenticator.sessionErrorKey,
      "You are not authorized to access this resource. Please log in and try again."
    );

    if (shouldRedirect) {
      throw redirect("/auth", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    /*return handleResponse({
      error: {
        message:
          "You are not authorized to access this resource. Please log in and try again.",
      },
      statusCode: 401,
      statusText: "Unauthorized",
    });
    */
  }

  return authRes;
  // const session = await getSession(requestOrSession);
  // console.log("Redirect Url", session.get(REDIRECT_URL));

  // const currentUrl = new URL(
  //   isRequest(requestOrSession) ? requestOrSession.url : "/"
  // );

  // if (isAuthenticated) {
  //   return isAuthenticated;
  // }

  // if (currentUrl.pathname.includes("auth")) {
  //   const rdrPath = currentUrl.searchParams.get(REDIRECT_SEARCH_PARAM) || "/";

  //   session.set(REDIRECT_URL, rdrPath);
  //   await commitSession(session);
  //   return;
  // } else {
  //   // This does not provide successRedirect, since it expects
  //   // isAuthenticated to be successful,
  //   // We will redirect to authenticate and the redirect back to this current url after Authentication
  //   return `/auth?${REDIRECT_SEARCH_PARAM}=${currentUrl.toString()}`;
  // }
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

export const logout = (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => authenticator.logout(request, options);
