import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { AuthUser } from "../types/auth-user.type";

const REDIRECT_URL = "redirect-url";
const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(googleStrategy);
export { authenticator };

export const getRedirectUrl = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return await session.get(REDIRECT_URL);
};

export const setRedirectUrl = async (request: Request, url: string) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.set(REDIRECT_URL, url);
};
