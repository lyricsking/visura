import { useOutletContext } from "@remix-run/react";
import type { IOrder } from "~/dashboard/order/order.type";
import CartItem from "./components/cart-item";

export default function Cart() {
  const cart: IOrder = useOutletContext();

  return (
    <div className="grid grid-rows-2 md:grid-cols-[1fr_30%] md:gap-4 p-4">
      {/* Cart item details */}
      <div>
        {cart.items &&
          cart.items.map((item, index) => <CartItem key={index} item={item} />)}
      </div>

      {/* Order summary */}
      <div></div>
    </div>
  );
}
