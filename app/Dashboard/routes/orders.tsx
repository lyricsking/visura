import { LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

export const handle = {
  pageName: "Orders",
  breadcrumb: {
    id: "orders",
    label: "Orders",
  },
};

export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const params = useParams();

  const status = params["status"] || "pending";
  const onStatus = (newStatus: string) => {
    navigate(`/dashboard/orders/${newStatus}`);
  };

  const { sidebarMenuRef }: any = useOutletContext();
  if (sidebarMenuRef) {
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
    <Tabs defaultValue={status} onValueChange={onStatus}>
      <TabsList className="border-violet-400">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="processing">Processing</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <div className="">
          {orders.map((order) => (
            <div key={order.id} className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Order #{order.id}
              </h2>
              <p className="mt-1 text-sm text-gray-600">Date: {order.date}</p>
              <p className="mt-1 text-sm text-gray-600">
                Total: ${order.total}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Status: {order.status}
              </p>
              <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md">
                View Details
              </button>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="processing">Change your password here.</TabsContent>
    </Tabs>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const orders = [
    {
      id: "",
      date: new Date(),
      total: 5999.99,
      status: "pending",
    },
  ];
  return { orders };
};
