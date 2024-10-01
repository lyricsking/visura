/**
 * A cache object to identify either a signed in user or non-sign-in user(Anon).
 *
 * @property id (unique and optional) to indetify a signed in user
 * @property email the email address of the curent user, for bot anon and signin user
 */
export interface AuthUser {
  id?: string;
  email: string;
}
