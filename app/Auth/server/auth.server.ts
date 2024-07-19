//  npm install remix-auth remix-auth-google

const authenticator = new Authenticator(sessionStorage);

authenticator.use(googleStrategy);

export { authenticator };
