import { LoaderFunction } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import { SettingsType } from "../../Dashboard/type/settings.type";
import { cn } from "~/utils/util";
import { Input } from "~/components/input";
import {
  ACCOUNT_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  PROFILE_UPDATE_ACTION,
} from "../../Dashboard/utils/constants";
import Button from "~/components/button";

export default function ProfileSettings({ user }: SettingsType) {
  const {
    id,
    email,
    profile: { firstName, lastName },
  } = user;

  const accountFetcher = useFetcher();
  const passwordsFetcher = useFetcher();
  const accountStatusFetcher = useFetcher();

  const name = firstName && lastName ? firstName + " " + lastName : "";
  return (
    <>
      <accountFetcher.Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value={PROFILE_UPDATE_ACTION} />
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
                defaultValue={name}
                placeholder="Your full name"
                className={cn("mt-1", !name && "italic")}
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

      <passwordsFetcher.Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value={PASSWORD_UPDATE_ACTION} />
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

      <accountStatusFetcher.Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value={ACCOUNT_UPDATE_ACTION} />
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Disable Account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Info: Your account can be activated again when you sign in.
            </p>
            <input type="hidden" name="userId" value={user.id} />
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
    </>
  );
}
