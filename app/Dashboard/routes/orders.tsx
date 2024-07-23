import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useEffect } from "react";

export const handle = {
  pageName: "Orders",
  breadcrumb: {
    id: "orders",
    label: "Orders"
  },
};

export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();
  
  const { sidebarMenuRef }: any = useOutletContext();
    if(sidebarMenuRef){
      sidebarMenuRef.current = () => [
        {
          id: "pending",
          label: "Pending",
          url: "orders",
        },
        {
          id: "processing",
          label: "Processing",
          url: "orders/processing",
        },
      ];
    }
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        {orders.map((order) => (
          <div key={order.id} className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Order #{order.id}</h2>
            <p className="mt-1 text-sm text-gray-600">Date: {order.date}</p>
            <p className="mt-1 text-sm text-gray-600">Total: ${order.total}</p>
            <p className="mt-1 text-sm text-gray-600">Status: {order.status}</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const orders = [
    {
      id: "",
      date: Date.now(),
      total: 5999.99,
      status: "pending"
    }
  ]
  return { orders };
};
