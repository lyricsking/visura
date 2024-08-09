import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { AuthUser } from "../types/auth-user.type";
import { json, redirect } from "@remix-run/node";

export const REDIRECT_URL = "redirect-url";
export const REDIRECT_SEARCH_PARAM = "rdr";

const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(googleStrategy);
//export { authenticator };

export const isAuthenticated = async (
  request: Request,
  options?: {
    successRedirect?: string;
  }
) => {
  const { successRedirect } = options || {};
  const session = await getSession(request.headers.get("Cookie"));

  console.log(session.get(REDIRECT_URL));

  const isAuthenticated = await authenticator.isAuthenticated(request);
  if (!isAuthenticated) {
    if (!successRedirect) {
      // This does not provide successRedirect, since expects a isAuthenticated to be successful,
      // We must redirect back to this url after Authentication

      const currentUrl = new URL(request.url);

      throw redirect(`/auth?rdr=${currentUrl.toString()}`);
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

export const authenticate = async (request: Request) => {
  const user = await authenticator.authenticate("google", request, {
    failureRedirect: "/auth",
  });

  console.log(user);

  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user);

  const successRedirect = (await session.get(REDIRECT_URL)) || "/";

  session.unset(REDIRECT_URL);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  return redirect(successRedirect, { headers });
};

export const logout = (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => authenticator.logout(request, options);
