//  npm install remix-auth remix-auth-google
import {Authenticator} from "remix-auth"
import { sessionStorage } from "~/Shared/utils/session";
import { googleStrategy } from "../strategy/google-strategy";

const authenticator = new Authenticator(sessionStorage);

authenticator.use(googleStrategy);

export { authenticator };
