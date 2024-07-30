import { LoaderFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { SettingsType } from "../type/settings.type";

export default function ProfileSettings(props: SettingsType) {
  const { user, profile } = props;

  const name = profile.firstName + " " + profile.lastName;
  return (
    <>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-gray-600">Name: {name}</p>
          <p className="mt-1 text-sm text-gray-600">Email: {user.email}</p>
        </div>
      </div>
      <Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value="updateProfile" />
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Edit Profile
            </h2>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
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
              <input
                type="password"
                name="currentPassword"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>{" "}
              <input
                type="password"
                name="newPassword"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>{" "}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Change Password
              </button>{" "}
            </div>
          </div>{" "}
        </div>
      </Form>
      <Form method="post" className="mt-6 space-y-6">
        <input type="hidden" name="_action" value="deleteAccount" />{" "}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Delete Account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Warning: This action cannot be undone.
            </p>
            <input type="hidden" name="userId" value={user._id.toString()} />
            <div className="mt-4">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded-md"
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