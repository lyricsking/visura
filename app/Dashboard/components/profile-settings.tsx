import { LoaderFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { SettingsType } from "../type/settings.type";
import { cn } from "~/utils";
import { Input } from "~/components/input";

export default function ProfileSettings(props: SettingsType) {
  const { user, profile } = props;

  const name = profile?.firstName && profile.lastName ?profile.firstName + " " + profile.lastName: "";
  return (
    <>
      <Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value="updateProfile" />
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
                placeholder="Your name"
                className={cn("mt-1", !name && "italic")}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                name="email"
                defaultValue={user?.email}
                className="mt-1"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-indigo-400 text-white py-2 px-4 rounded-md"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </Form>
      <Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value="changePassword" />
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
              </label>{" "}
              <Input type="password" name="newPassword" className="mt-1" />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-indigo-400 text-white py-2 px-4 rounded-md"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </Form>
      <Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value="deleteAccount" />{" "}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Disable Account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Info: Your account can be activated again when you sign in.
            </p>
            <input type="hidden" name="userId" value={user?._id.toString()} />
            <div className="mt-4">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-4 rounded-md"
              >
                Delete Account
              </button>
            </div>
          </div>{" "}
        </div>{" "}
      </Form>{" "}
    </>
  );
}