import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getOrders } from "../server/order.server";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs";
import { OrderStatus } from "../types/order.type";
import { NoOrder } from "../components/order-selector";

export async function loader({ request }: LoaderFunctionArgs) {
  // Parse the search params for `?status=`
  const url = new URL(request.url);
  //  If present, status would be used to fetch orders of specific status
  const status = url.searchParams.get("status") || "";

  let data = {};
  const orders = await getOrders();
  data = { status, orders };

  return json(data);
}

export default function Order() {
  const { orders, status } = useLoaderData<typeof loader>();

  const tabs =
    status && orders
      ? Object.keys(OrderStatus).map((value) => (
          <TabsTrigger key={value} value={value} asChild>
            <Link to={`/orders?status=${value}`}>{value}</Link>
          </TabsTrigger>
        ))
      : null;

  return tabs ? (
    <Tabs defaultValue={status} className="w-[400px]">
      <TabsList>{tabs}</TabsList>
      <Outlet context={{ status }} />
    </Tabs> //  Render the appropriate component based requested status
  ) : (
    <NoOrder term={"status"} />
  ); // No order id or orders for the passed status was found
}
