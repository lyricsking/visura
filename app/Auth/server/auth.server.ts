import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";
import { AuthUser } from "../types/auth-user.type";
import { Session, json, redirect } from "@remix-run/node";
import { createUser, getUser, updateUser } from "~/User/server/user.server";
import { IUser, UserType } from "~/User/types/user.types";
import { HydratedDocument } from "mongoose";
import { IHydratedUser, IUserMethods, IUserVirtuals } from "~/User/models/user.model";
import { isRequest } from "~/utils/is-request";
import { createUserProfile } from "~/User/server/user-profile.server";
import { getStaffByUserId } from "~/User/server/staff.server";
import { IUserProfile } from "~/User/types/user-profile.type";

export const REDIRECT_URL = "redirect-url";
export const REDIRECT_SEARCH_PARAM = "rdr";

const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(googleStrategy);
//export { authenticator };

/**
 * Wrapper around remix-auth's authenticate method, properly handles result of the authenticator.authenticate method call.
 * @param request Request
 */
export const authenticate = async (request: Request) => {
  const user = await authenticator.authenticate("google", request, {
    failureRedirect: "/auth",
  });

  console.log("User %s", user);

  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user);

  const successRedirect = (await session.get(REDIRECT_URL)) || "/";

  session.unset(REDIRECT_URL);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  return redirect(successRedirect, { headers });
};

/**
 * An abstraction over Remix Auth authenticator, It checks if user is already authenticated and properly handles redirection, ensuring user can go back to initial page that failed authentication.
 *
 * @param request Request Request object of the current page
 * @param options Optional options to pass to authenticator
 */
export const isAuthenticated = async (
  request: Request,
  options?: {
    successRedirect?: string;
  }
) => {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  console.log("Redirect Url", session.get(REDIRECT_URL));

  const currentUrl = new URL(request.url);

  if (!isAuthenticated) {
    // This does not provide successRedirect, since it expects
    // isAuthenticated to be successful,
    // We must redirect back to this url after Authentication
    if (!successRedirect) {
      throw redirect(`/auth?${REDIRECT_SEARCH_PARAM}=${currentUrl.toString()}`);
    } else if (successRedirect) {
      // SuccessRedirect was provided we probably already anticipate that
      // esp in the sign in route, so we simply save the redirection url
      // to session so we can access later on.
      session.set(REDIRECT_URL, successRedirect);
      if (currentUrl.pathname.includes("auth")) {
        return await commitSession(session);
      }

      // throw redirect(`/auth?${REDIRECT_SEARCH_PARAM}=${successRedirect}`);
    }
  } else if (isAuthenticated && successRedirect) {
    throw redirect(successRedirect);
  } else {
    return isAuthenticated;
  }
};

export const getSessionUser = async (
  param: Request | Session
): Promise<AuthUser> => {
  let session: Session;
  if (isRequest(param)) {
    session = await getSession(param.headers.get("Cookie"));
  } else {
    session = param as Session;
  }
  return session.get(authenticator.sessionKey);
};

export const setSessionUser = async (
  requestOrSession: Request | Session,
  hydratedUser: IHydratedUser
): Promise<AuthUser> => {
  let session: Session;
  if (isRequest(requestOrSession)) {
    session = await getSession(requestOrSession.headers.get("Cookie"));
  } else {
    session = requestOrSession as Session;
  }

  let authUser: AuthUser = session.get(authenticator.sessionKey);
  let newAuthUser: AuthUser = {
    ...authUser,
    id: hydratedUser.id,
    firstName: hydratedUser.profile.firstName,
    lastName: hydratedUser.profile.lastName,
    email: hydratedUser.email,
    photo: hydratedUser.profile.photo,
    type: hydratedUser.type,
    role: hydratedUser.staff?.role,
  };

  session.set(authenticator.sessionKey, newAuthUser);

  return newAuthUser;
};

export const login = async (
  requestOrSession: Request | Session,
  { firstName, lastName, email, photo, type }: AuthUser
) => {
  // Attempt to retrieve user with the email
  let user = await getUser({
    fields: { email },
    populate: { path: "profile" },
  });

  // if there is no user, then it means we do have user with that email, ensure we create one.
  if (!user) {
    user = await createUser({ email, type: type || UserType.customer });
    console.log("Created user %s", user);
  }

  // If we have user but no profile, it means there is profile info for the user yet, we create a profile then.
  if (!user.profile) {
    let profileData: Omit<IUserProfile, "_id"> = {
      userId: user._id,
      firstName,
      lastName,
      photo: photo,
      preferences: defaultPreferences,
    };

    const userProfile = await createUserProfile(profileData);
    console.log("Created user profile", userProfile);

    user.profile = userProfile;
  }
  // Since the user has sign in, we ensure they a marked active
  if (!user.isActive) {
    await updateUser(user._id, { isActive: true });
  }

  // if user type is "staff", we find the staff object
  if (user.type === UserType.staff) {
    let staff = await getStaffByUserId(user.id);
    if (staff) {
      user.staff = staff;
    }
  }

  return setSessionUser(requestOrSession, user);
};

export const logout = (
  request: Request,
  options: {
    redirectTo: string;
    headers?: HeadersInit;
  }
) => authenticator.logout(request, options);

const defaultPreferences: IUserProfile["preferences"] = {
  notifications: {
    preferredSupportChannel: "whatsapp",
    orderUpdates: true,
    promotional: true,
    subscriptionReminders: true,
    supportNotification: true,
  },
  display: {
    theme: "light",
    language: "en",
    currency: "NGN",
  },
  //privacy: {
  //  dataSharing: true,
  //  activityTracking: true,
  //  accountVisibility: true,
  //},
  order: {
    deliveryInstructions: "Leave at door",
    packaging: "standard",
  },
};
