import { json, useNavigate, useOutletContext } from "@remix-run/react";
import { getSession } from "~/utils/session";
import { deleteCart, updateCartItem } from "../server/cart.server";
import { IOrder } from "../types/order.type";
import CartItem from "../components/cart-item";
import { useEffect } from "react";
import { DELETE_ACTION_KEY, UPDATE_ACTION_KEY } from "../utils/constants";
import { getSessionUser } from "~/Auth/server/auth.server";

export const action = async ({ request }: any) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const _action = formData.get("_action");
  const productId = formData.get("productId");
  const quantity = formData.get("quantity");
  const purchaseMode = formData.get("purchaseMode");

  const user = await getSessionUser(request);

  if (!user || !user["email"]) {
    console.log("Cannot process, No user info available.");
    return json({ success: false });
  }

  if (!_action) {
    console.log("Cannot process, No _action provided.");
    return json({ success: false });
  }

  if (!productId) {
    console.log("Cannot process, No productId provided.");
    return json({ success: false });
  }

  const email = user["email"];

  // Handle quantity and subscription updates
  if (
    _action === UPDATE_ACTION_KEY &&
    productId &&
    (!isNaN(quantity) || purchaseMode)
  ) {
    // Update the item quantity and subscription status in your database
    await updateCartItem(email, productId, quantity, purchaseMode);
    // For the sake of this example, we'll just return the new values
    return json({ success: true });
  } else if (_action === DELETE_ACTION_KEY && productId) {
    await deleteCart(email);

    return json({ success: true });
  }
};

export const handle = {
  buttonLabel: "Checkout",
  name: "Cart",
  onSubmit: () => {},
};

export default function Cart() {
  const { cart, childMethodRef }: { cart: IOrder; childMethodRef: any } =
    useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (childMethodRef) {
      childMethodRef.current = () => {
        if (Array.isArray(cart.items) && cart.items.length > 0) {
          return navigate("/cart/shipping");
        }

        alert("No Items added to cart");
      };
    }
  }, [childMethodRef]);

  return (
    <div className="h-full divide-y">
      {/* Cart item details */}
      {cart.items &&
        cart.items.map((item, index) => <CartItem key={index} item={item} />)}
    </div>
  );
}
