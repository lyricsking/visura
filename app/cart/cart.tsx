import { useOutletContext } from "@remix-run/react";

export default function Cart(order: OrderType) {
  const {cart} = useOutletContext();
  
  return (
    <div className="grid grid-rows-2 md:grid-cols-[1fr_30%] md:gap-4 p-4">
      {/* Cart item details */}
      <div>
        {cart.items && cart.items.map((item) => (<CartItem item={item} />)
        )}
      </div>
      
      {/* Order summary */}
      <div>
      </div>
    </div>
  )
}