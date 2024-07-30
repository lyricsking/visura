import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";

const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(googleStrategy);

export { authenticator };
