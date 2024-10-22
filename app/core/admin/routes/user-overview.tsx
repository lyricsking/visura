import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "~/core/auth/server/auth.server";
import { IHydratedUser } from "~/user/models/user.model";

export const handle = {
  pageName: "Overview",
  breadcrumb: {
    id: "overview",
    label: "Overview",
  },
  sidebarMenu: () => [
    {
      id: "orders",
      label: "Orders",
      url: "/dashboard/orders",
    },
    {
      id: "subscriptions",
      label: "Subscription",
      url: "/dashboard/subscriptions",
    },
    {
      id: "invoices",
      label: "Invoices",
      url: "/dashboard/invoices",
    },
    {
      id: "transactions",
      label: "Transactions",
      url: "/dashboard/transactions",
    },
    {
      id: "settings",
      label: "Settings",
      url: "/dashboard/settings",
    },
    {
      id: "support",
      label: "Support Center",
      url: "/support",
    },
  ],
};

export default function Overview() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="italic font-semibold">Welcome back, {data.userName}!</div>

      {/* Account Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Account Summary</h2>
        <p>Recent Activity: {data.accountSummary.recentActivity}</p>
        <p>Next Delivery Date: {data.accountSummary.nextDeliveryDate}</p>
      </div>

      {/* Active Subscriptions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Active Subscriptions</h2>
        <ul>
          {data.subscriptions.map((subscription) => (
            <li key={subscription.id} className="mb-2">
              <p>
                {subscription.name} - {subscription.status}
              </p>
              <p>Next Delivery Date: {subscription.nextDeliveryDate}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
        <ul>
          {data.orders.map((order) => (
            <li key={order.id} className="mb-2">
              <p>Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Invoices for Upcoming Sub Renewals */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          Upcoming Subscription Renewals
        </h2>
        <ul>
          {data.invoices.map((invoice) => (
            <li key={invoice.id} className="mb-2">
              <p>Invoice ID: {invoice.id}</p>
              <p>Due Date: {invoice.dueDate}</p>
              <p>Amount: {invoice.amount}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Notifications</h2>
        <ul>
          {data.notifications.map((notification) => (
            <li key={notification.id} className="mb-2">
              <p>{notification.message}</p>
              <p>Date: {notification.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Health & Wellness Tips */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Health & Wellness Tips</h2>
        <ul>
          {data.healthTips.map((tip) => (
            <li key={tip.id} className="mb-2">
              <h3 className="font-semibold">{tip.title}</h3>
              <p>{tip.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Products */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Recommended Products</h2>
        <ul>
          {data.recommendedProducts.map((product) => (
            <li key={product.id} className="mb-2">
              <h3 className="font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Mock data for demonstration
const mockData = (firstname: string, lastName: string) => ({
  userName: firstname + " " + lastName,
  accountSummary: {
    recentActivity: "Ordered Vitamin D Supplement",
    nextDeliveryDate: "2024-07-25",
  },
  subscriptions: [
    {
      id: "1",
      name: "Vitamin D",
      status: "Active",
      nextDeliveryDate: "2024-07-25",
    },
    {
      id: "2",
      name: "Omega-3",
      status: "Paused",
      nextDeliveryDate: "2024-08-01",
    },
  ],
  orders: [
    { id: "101", date: "2024-07-10", status: "Delivered" },
    { id: "102", date: "2024-07-15", status: "Processing" },
  ],
  invoices: [
    { id: "301", dueDate: "2024-08-01", amount: "$29.99" },
    { id: "302", dueDate: "2024-08-15", amount: "$19.99" },
  ],
  notifications: [
    {
      id: "201",
      message: "Your Vitamin D Supplement has been shipped",
      date: "2024-07-11",
    },
    { id: "202", message: "New health tips available", date: "2024-07-12" },
  ],
  healthTips: [
    {
      id: "401",
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily.",
    },
    {
      id: "402",
      title: "Regular Exercise",
      content: "Engage in physical activity for at least 30 minutes a day.",
    },
  ],
  recommendedProducts: [
    {
      id: "501",
      name: "Vitamin C",
      description: "Boost your immune system with our Vitamin C supplement.",
      price: "$15.99",
    },
    {
      id: "502",
      name: "Multivitamin",
      description: "Complete multivitamin for daily health.",
      price: "$25.99",
    },
  ],
});

export const loader: LoaderFunction = async ({ request }) => {
  // Replace with actual data fetching logic
  let user: IHydratedUser | undefined = await getUserFromSession(request);

  return json(
    mockData(user?.profile.firstName || "", user?.profile?.lastName || "")
  );
};
