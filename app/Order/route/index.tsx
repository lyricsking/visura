import { NavigateFunction, json, useOutletContext } from "@remix-run/react";
import { getSession, USER_SESSION_KEY } from "~/Shared/utils/session";
import { deleteCart, updateCartItem } from "../server/cart.server";
import { IOrder } from "../type/order.type";
import CartItem from "../components/cart-item";

export const DELETE_ACTION_KEY="_delete";
export const UPDATE_ACTION_KEY="_update";

export const action = async ({ request }: any) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  

  const _action = formData.get("_action");
  const productId = formData.get("productId");
  const quantity = formData.get("quantity");
  const purchaseMode = formData.get("purchaseMode");
  
  const user = session.get(USER_SESSION_KEY);

  if(!user || !user["email"]) { 
    console.log("Cannot process, No user info available.");
    return json({ success: false });
  }
  
  if(!_action) { 
    console.log("Cannot process, No _action provided.");
    return json({ success: false });
  }
  
  if(!productId) { 
    console.log("Cannot process, No productId provided.");
    return json({ success: false });
  }
  
  const email = user["email"]
  
  // Handle quantity and subscription updates
  if (_action === UPDATE_ACTION_KEY && productId && (!isNaN(quantity) || purchaseMode)) {
    // Update the item quantity and subscription status in your database
    await updateCartItem(email, productId, quantity, purchaseMode)
    // For the sake of this example, we'll just return the new values
    return json({ success: true });
  } else if(_action === DELETE_ACTION_KEY && productId) {
    await deleteCart(email)
    
    return json({ success: true });
  }
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
