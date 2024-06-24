import {getRecommendationById,prepRecommendationIdForSession} from ".quiz.server.ts";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import Cart from ".components/carts";
import SingleOrder from ".components/single-order";

export function loader({request, params}: LoaderFunctionArgs){
  // Parse the search params for `?status=`
  const url = new URL(request.url);
  //  If present, status would be used to fetch orders of specific status
  const status = url.searchParams.get("status")||"";
  
  let data = {}
  const orders = await getOrders({status})
  data = {status, orders}
  
  return json(data)
}

export default function Order(){
  const { orders, status } = useLoaderData<typeof loader>();
  
  const tabs = (status && orders) 
    ? Object.keys(OrderStatus).map((value) => <TabsTrigger key={value} value={value} asChild>
        <Link to={`/orders?status=${value}`}>
          {value}
        </Link>
      </TabsTrigger>
      )
    : null
  
  return tabs
  ? <Tabs defaultValue={status} className="w-[400px]">
      <TabsList>{tabs}</TabsList>
      <Outlet context={{status}} />
    </Tabs> //  Render the appropriate component based requested status
  : <NoOrder term={status} />  // No order id or orders for the passed status was found
}