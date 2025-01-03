import { Authenticator } from "remix-auth";
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
export const userAuthKey = "auth-user";

export const authErrorKey = "auth-error";

const StrategyType = ["google", "form"] as const;
type StrategyType = (typeof StrategyType)[number];

export const authenticator = new Authenticator<AuthUser>();

authenticator.use(formStrategy);
// authenticator.use(googleStrategy);

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
  const session = await getSession(request);

  try {
    const authUser = await authenticator.authenticate(strategy, request);
    if (isAuthUser(authUser)) {
      await setAuthenticatedUser(session, authUser);
      return authUser;
    }
  } catch (error) {
    if (error instanceof Error) {
      // here the error related to the authentication process

      session.flash(authErrorKey, error.message);
    }

    throw error; // Re-throw other values or unhandled errors
  }
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
): Promise<AuthUser | undefined> => {
  const authUser = getAuthenticatedUser(request);

  if (!authUser) {
    const session = await getSession(request);
    const currentUrl = new URL(request.url);
    session.set(REDIRECT_URL, currentUrl);

    session.flash(
      authErrorKey,
      "You are not authorized to access this resource. Please log in and try again."
    );

    if (shouldRedirect) {
      throw redirect("/auth", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  return authUser;
};

export const getAuthenticatedUser = async (
  requestOrSession: Request | Session
): Promise<AuthUser | undefined> => {
  const session: Session = await getSession(requestOrSession);

  return session.get(userAuthKey);
};

export const setAuthenticatedUser = async (
  requestOrSession: Request | Session,
  newAuthUser: AuthUser
): Promise<void> => {
  const session = await getSession(requestOrSession);
  session.set(userAuthKey, newAuthUser);

  await commitSession(session);
};

export const logout = async (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => {
  const session = await getSession(request);
  session.unset(userAuthKey);

  await commitSession(session);
};
