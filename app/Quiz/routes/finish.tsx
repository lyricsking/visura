// InputText.js
import React, { useEffect, useRef } from "react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import { useFetcher, useNavigate } from "@remix-run/react";
import id from "~/Order/routes/id";
import formDataToObject from "~/utils/form-data-to-object";
import { action } from "../actions/finish.action";
import { Checkbox } from "~/components/checkbox";

export { action };

export default function GetResultForm() {
  let fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  let formData = fetcher.formData;

  let firstname = (formData?.get("firstname") as string) || undefined;
  let lastname: string | undefined =
    (formData?.get("lastname") as string) || undefined;
  let email = (formData?.get("email") as string) || undefined;
  let subscribe = (formData?.get("subscribe") as string) === "true" || false;

  let navigate = useNavigate();
  useEffect(() => {
    if (!isSubmitting && fetcher.data&&(fetcher.data as any).success === true) {
      alert(JSON?.stringify(fetcher.data, null, 2));
      navigate("/cart");
    }
  }, [fetcher]);

  return (
    <fetcher.Form
      method="post"
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
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
            <div>
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
            <div>
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
  );
}
