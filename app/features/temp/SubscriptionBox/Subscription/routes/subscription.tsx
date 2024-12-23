import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import { Form, useLoaderData, useOutletContext } from "react-router";
import { useEffect } from "react";

export const handle = {
  pageName: "Subscriptions",
  breadcrumb: [
    {
      id: "subscriptions",
      label: "Subscriptions",
    },
  ],
};

export default function Subscriptions() {
  const { subscriptions } = useLoaderData<typeof loader>();

  const { sidebarMenuRef }: any = useOutletContext();
  if (sidebarMenuRef) {
    sidebarMenuRef.current = () => [
      {
        id: "active",
        label: "Active",
        url: "?status=active",
      },
    ];
  }

  return (
    <>
      {subscriptions.map((subscription) => (
        <div
          key={subscription.id}
          className="mt-6 bg-white shadow sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Subscription #{subscription.id}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Status: {subscription.status}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Next Delivery: {subscription.nextDelivery}
            </p>
            <Form method="post" className="mt-4 space-y-4">
              <input
                type="hidden"
                name="subscriptionId"
                value={subscription.id}
              />
              <input type="hidden" name="_action" value="updateSubscription" />
              <label className="block text-sm font-medium text-gray-700">
                Delivery Frequency
              </label>
              <select
                name="frequency"
                defaultValue={subscription.frequency}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Update
              </button>
            </Form>
            <div className="flex items-center justify-center gap-4">
              <Form method="post" className="mt-4 space-y-4">
                <input
                  type="hidden"
                  name="subscriptionId"
                  value={subscription.id}
                />
                <input type="hidden" name="_action" value="pauseSubscription" />
                <button
                  type="submit"
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md"
                >
                  Pause
                </button>
              </Form>
              <Form method="post" className="mt-4 space-y-4">
                <input
                  type="hidden"
                  name="subscriptionId"
                  value={subscription.id}
                />
                <input
                  type="hidden"
                  name="_action"
                  value="cancelSubscription"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </Form>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const subscriptions = [
    {
      id: "748",
      nextDelivery: "31st January, 2024",
      status: "pending",
      frequency: 4,
    },
  ];
  return { subscriptions };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const subscriptionId = formData.get("subscriptionId");

  if (actionType === "updateSubscription") {
    //await updateUserSubscription(subscriptionId, formData);
  } else if (actionType === "pauseSubscription") {
    //await pauseUserSubscription(subscriptionId);
  } else if (actionType === "cancelSubscription") {
    //await cancelUserSubscription(subscriptionId);
  }

  return redirect("/subscriptions");
};
