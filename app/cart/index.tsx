import { NavigateFunction, json, useOutletContext } from "@remix-run/react";
import type { IOrder } from "~/dashboard/order/order.type";
import CartItem from "./components/cart-item";

export const DELETE_ACTION_KEY="DELETE";
export const UPDATE_ACTION_KEY="UPDATE";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const discountCode = formData.get("discountCode");
  const productId = formData.get("productId");
  const quantity = parseInt(formData.get("quantity"), 10);
  const isSubscribe = formData.get("isSubscribe") === "true";

  let discount = 0;

  // Handle discount code application
  if (discountCode) {
    // Validate the discount code and calculate the discount amount
    if (discountCode === "SAVE10") {
      discount = 10.0;
    }
    return json({ discount });
  }

  // Handle quantity and subscription updates
  if (productId && !isNaN(quantity)) {
    // Update the item quantity and subscription status in your database
    // For the sake of this example, we'll just return the new values
    return json({ productId, quantity, isSubscribe });
  }

  return null;
};

export const handle = {
  buttonLabel: "Checkout",
  name: "Cart",
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    if(Array.isArray(cart.items) && cart.items.length > 0){
      return navigate("shipping");
    }
    
    alert("No Items added to cart")
  },
};

export default function Cart() {
  const { cart }: { cart: IOrder } = useOutletContext();

  return (
    <div>
      {/* Cart item details */}
      <div className="divide-y">
        {cart.items &&
          cart.items.map((item, index) => <CartItem key={index} item={item} />)}
      </div>
    </div>
  );
}
