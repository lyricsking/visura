import {getRecommendationById,prepRecommendationIdForSession} from ".quiz.server.ts";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import Cart from ".components/carts";
import SingleOrder from ".components/single-order";

export type OrderItem= {
  id: string, //  Product id
  quantity: number, //  Product quantity
  isSubscribe: boolean,  //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
}

export const OrderStatus= {
  cart: "cart", //  Orders still in cart
  checkout: "checkout", //  Order has been accepted and ready for payment
  completed: "completed", //  Order completed
  inTransit: "inTransit", //  Order is in transit now.
  paid: "paid",// Order has been paid for
  processing: "processing",
}as const
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

export type OrderType= {
  _id: string,
  items: OrderItem[],
  status: OrderStatus,
}

export function loader({request, params}: LoaderFunctionArgs){
  const status = params['status'];
  const id = params['id']
  
  let data = {
    id, 
    status
  }
  
  if(id)  {
    const order = await getOrder({id})
    data={id, order}
    
  } else if(status) {
    const orders = await getOrders({status})
    data={status, orders}
  }
  
  return json(data)
}

export default function Order(){
  const { id, order, orders, status } = useLoaderData<typeof loader>();
  
  return id && order 
  ? <OrderTypeSelector order={order}/>  
  : status && orders 
  ? <OrderList status={status} orders={orders}/>
  : <NoOrder term={id|| status} />
}

function OrderTypeSelector(order: OrderType) {
  
  const status = order.status;
  
  const switchStatus = useCallback(() =>  {
    switch (status) {
      case OrderStatus.cart:
        return <Cart order={order} />
        
      default: return <SingleOrder order={order} />;
    }
  }, [orders, status])
  
  return <>{switchStatus()}</>
}

function NoOrder(term: string) {
  return <p>No orders found for <span className="uppercase text-2xl font-bold">{term}</span></p>
}

function OrderList ({status, orders}:{status: OrderStatus, orders: OrderType[]}){
  
  const {tabs, tabsContent} = useMemo(() => {
    const tabs = []
    const tabsContent = []
    
    Object.keys(OrderStatus).forEach  ((value) =>{
      tabs.push(
        <TabsTrigger key={value} value={value}>
          {value}
        </TabsTrigger>
      )
    
      tabsContent.push(
        <TabsContent key={value} value={value}>
          {orders}
        </TabsContent>
      )
    });
    return {tabs, tabsContent}
    
  }, [orders])
  
  return (
    <Tabs defaultValue={status} className="w-[400px]">
      <TabsList>{tabs}</TabsList>
      {tabsContent}
    </Tabs>
  )
}