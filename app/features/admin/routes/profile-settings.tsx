import { useFetcher, useLoaderData } from "@remix-run/react";
import { cn } from "~/shared/utils/util";
import { Input } from "~/shared/components/input";
import Button from "~/shared/components/button";
import { SettingsType } from "../type/settings.type";
import { LoaderFunctionArgs } from "@remix-run/node";
import { PluginModel } from "~/core/plugin/models/plugin.model";
import { IPlugin } from "~/core/plugin/types/plugin";
import { handleResponse } from "~/shared/utils/helpers";
import { DBReponse, handleDbResult } from "~/shared/utils/mongoose";
import { isAuthenticated } from "~/core/auth/server/auth.server";
import { isAuthUser } from "~/core/auth/utils/helper";
import { IHydratedUser } from "~/core/user/models/user.model";
import { getUserOrFetch } from "~/core/user/server/user.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the authenticated user or redirects to auth page
  const authRes = await isAuthenticated(request);

  if (!isAuthUser(authRes)) {
    return authRes;
  }

  // check the subdomain we are accessing the page from, useed to manage staff users access.
  // let subdomain = getSubdomain(request);
  // if the user has role access to the subdomain
  // Get the cache user object from session, could be undefined or IHydrated user.
  let userResponse: DBReponse<IHydratedUser | undefined> = await handleDbResult(
    getUserOrFetch(request, authRes.email)
  );

  return handleResponse<IHydratedUser | null>({
    ...userResponse,
    statusCode: 200,
  });
};

export default function ProfileSettings() {
  const data = useLoaderData<typeof loader>();

  let user: IHydratedUser = {} as IHydratedUser;
  if (data.success) {
    user = data.data as IHydratedUser;
  }

  const { id: userId, email, firstName, lastName, meta } = user;

  const accountFetcher = useFetcher();
  const passwordsFetcher = useFetcher();
  const accountStatusFetcher = useFetcher();

  const userFullname = firstName && lastName ? firstName + " " + lastName : "";

  return (
    <div>
      <accountFetcher.Form
        method="post"
        action="user/update"
        className="mt-6 space-y-6"
      >
        <input type="hidden" name="_userId" value={userId} />
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Account Information
            </h2>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                name="name"
                defaultValue={userFullname}
                placeholder="Your full name"
                className={cn("mt-1", !userFullname && "italic")}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                name="email"
                defaultValue={user.email}
                className="mt-1"
                disabled
              />
            </div>
            <div className="mt-4">
              <Button
                type="submit"
                radius={"md"}
                className="w-full text-white bg-indigo-500 hover:bg-indigo-500 focus:ring-indigo-300"
                disabled={accountFetcher.state !== "idle"}
              >
                {accountFetcher.state != "idle"
                  ? "Updating..."
                  : "Update Profile"}
              </Button>
            </div>
          </div>
        </div>
      </accountFetcher.Form>

      <passwordsFetcher.Form
        method="post"
        action="user/password"
        className="mt-6 space-y-6"
      >
        <input type="hidden" name="_userId" value={userId} />
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Change Password
            </h2>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <Input type="password" name="currentPassword" className="mt-1" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input type="password" name="newPassword" className="mt-1" />
            </div>
            <div className="mt-4">
              <Button
                type="submit"
                radius={"md"}
                className="w-full text-white bg-indigo-500 hover:bg-indigo-500 focus:ring-indigo-300"
                disabled={passwordsFetcher.state !== "idle"}
              >
                {passwordsFetcher.state != "idle"
                  ? "Submitting"
                  : "Change Password"}
              </Button>
            </div>
          </div>
        </div>
      </passwordsFetcher.Form>

      <accountStatusFetcher.Form
        method="post"
        action="user/disable"
        className="mt-6 space-y-6"
      >
        <input type="hidden" name="_userId" value={userId} />
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Disable Account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Info: Your account can be activated again when you sign in.
            </p>
            <div className="mt-4">
              <Button
                type="submit"
                radius={"md"}
                className="w-full text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-yellow-300"
                disabled={accountFetcher.state !== "idle"}
              >
                {accountStatusFetcher.state !== "idle"
                  ? "Submitting"
                  : "Delete Account"}
              </Button>
            </div>
          </div>
        </div>
      </accountStatusFetcher.Form>
    </div>
  );
}
