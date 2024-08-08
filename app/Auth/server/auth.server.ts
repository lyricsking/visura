import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { AuthUser } from "../types/auth-user.type";

export const REDIRECT_URL = "redirect-url";
export const REDIRECT_SEARCH_PARAM="rdr"

const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(googleStrategy);
export { authenticator };

export const isAuthenticated = async (request: Request, successRedirect?: string) => {
  const originalUrl = new URL(request.url).toString();
  
  const session = await getSession(request.headers.get("Cookie"));
  await session.set(REDIRECT_URL, originalUrl);
  
  const isAuthenticated = await authenticator.isAuthenticated(request);
  
  if(isAuthenticated && successRedirect) {
    throw redirect(successRedirect);
  }else if(!isAuthenticated){
    const headers = {
      "Set-Cookie": await commitSession(session)
    }
    
    throw redirect("/auth", {headers})
  }else {
    return isAuthenticated;
  }
}

const authenticate = (request: Request) => {
  const user = await authenticator.authenticate("google", request, {
    failureRedirect: "/auth"
  });
  
  console.log(user);
  
  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user)
  
  const successRedirect = await session.get(REDIRECT_URL, "/");
  
  session.unset(REDIRECT_URL);
  const headers = {
    "Set-Cookie": await commitSession(session)
  }
  
  return redirect(successRedirect, { headers })
}