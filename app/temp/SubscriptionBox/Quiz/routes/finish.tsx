// InputText.js
import React, { useEffect, useRef } from "react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import id from "~/plugins/SubscriptionBox/Order/routes/id";
import formDataToObject from "~/utils/form-data-to-object";
import { action } from "../actions/finish.action";
import { Checkbox } from "~/components/checkbox";
import { loader } from "../loader/finish.loader";
import { AuthUser } from "~/auth/types/auth-user.type";
import { IHydratedUser } from "~/user/models/user.model";

export { action };
export { loader };

export default function Finish() {
  let data = useLoaderData<typeof loader>();

  let fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  let formData = fetcher.formData;

  const { user }: { user: IHydratedUser | undefined } = useOutletContext();

  let firstname =
    (formData?.get("firstname") as string) || user?.profile?.firstName;
  let lastname =
    (formData?.get("lastname") as string) || user?.profile?.lastName;
  let email = (formData?.get("email") as string) || user?.email;
  let subscribe =
    (formData?.get("subscribe") as string) === "true" ||
    user?.profile?.preferences?.notifications.orderUpdates;

  let navigate = useNavigate();
  useEffect(() => {
    if (
      !isSubmitting &&
      fetcher.data &&
      (fetcher.data as any).success === true
    ) {
      navigate("/cart");
    }
  }, [fetcher]);

  useEffect(() => {
    if (user) {
      // If it is, and it is a user, submit form
      fetcher.submit(
        {
          firstname: user.profile.firstName,
          lastname: user.profile.lastName,
          email: user.email,
          subscribe: user.profile.preferences.notifications.orderUpdates,
        },
        {
          method: "POST",
          action: "/quiz/finish",
        }
      );
    }
  }, [user]);

  return (
    <main className="flex flex-col max-h-screen w-full md:max-w-md bg-white md:my-6 mx-auto md:rounded-md md:shadow-md">
      <fetcher.Form
        method="post"
        className="w-full py-6 px-8 overflow-y-auto no-scrollbar pb-32"
      >
        <div className="flex flex-col space-y-20">
          <h2 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
            Final Step
          </h2>
          <div>
            <p className="text-center mb-6">
              Enter your name, and email so we can save your result.
            </p>
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium" htmlFor="firstname">
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  defaultValue={firstname}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium" htmlFor="lastname">
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  defaultValue={lastname}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={email}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <Checkbox
                id="subscribe"
                name="subscribe"
                defaultChecked={subscribe}
                className="mr-2"
              />
              <label htmlFor="subscribe">Subscribe to newsletter</label>
            </div>
            <p className="mb-6 text-sm">
              By clicking "Get Result", you agree to have read and accepted our{" "}
              <a href="#" className="text-indigo-500 underline">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-500 underline">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Fetching..." : "Get Result"}
        </Button>
      </fetcher.Form>
    </main>
  );
}
