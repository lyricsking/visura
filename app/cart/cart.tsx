import { json, useOutletContext } from "@remix-run/react";
import type { IOrder } from "~/dashboard/order/order.type";
import CartItem from "./components/cart-item";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const productId = formData.get("productId");
  const quantity = parseInt(formData.get("quantity"), 10);

  // Here you would update the item quantity in your database
  // For the sake of this example, we'll just return the new quantity

  return json({ productId, quantity });
};

export default function Cart() {
  const {cart}: {cart:IOrder} = useOutletContext();

  return (
    <div className="grid grid-rows-2 md:grid-cols-[1fr_30%] md:gap-4 p-4">
      {/* Cart item details */}
      <div>
        {cart.items &&
          cart.items.map((item, index) => <CartItem key={index} item={item} />)}
      </div>
    </div>
  );
}
