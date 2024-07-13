export function loader({params}: LoaderFunctionArgs){
  //  If present id will be used to fetch the specific order.
  //  The order's status will then be used to determine what order state component to render 
  //  e.g if the order's status is 'cart', the cart component will be rendered for the particular order.
  //  This is intended to reflect the most recent status of the order 
  //  especially in situation when an order is updated in the server but 
  //  the client couldnt receive the response.
  const id = params['id']
  
  let data = {id}
  
  if(id)  {
    const order = await getOrder({id})
    data = {id, order}
  }
  
  return json(data)
}

export default function Id(){
  const data = useLoaderData();
  
  return data.id && data.order 
    ? <OrderTypeSelector order={order} />
    : <NoOrder term="" />
}

/**
 * Renders appropriate component for this order based on it status
 * 
 * @param order OrderType
 */
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
