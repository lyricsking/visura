import React from "react";
import { useFetcher } from "@remix-run/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { IItem, OrderPurchaseMode } from "../type/order.type";
import { CART_FETCHER_KEY } from "../type/cart.type";
import { DELETE_ACTION_KEY, UPDATE_ACTION_KEY } from "../route";

interface CartItemProps {
  item: IItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

  const currentQuantity = item.quantity;
  const currentPurchaseMode = item.purchaseMode;

  const handleDelete = () => {
    fetcher.submit({
      _action: DELETE_ACTION_KEY,
      productId: item.productId.toString()
    },
    { method: "post" })
  }
  
  const handleUpdate = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const formData = new FormData();
    formData.append("_action", UPDATE_ACTION_KEY);
    formData.append("productId", item.productId.toString());
    formData.append("quantity", currentQuantity.toString());
    formData.append("purchaseMode", currentPurchaseMode?.toString() || "false");

    if (e.target.name === "quantity") {
      formData.set("quantity", e.target.value);
    } else if (e.target.name === "purchaseMode") {
      formData.set("purchaseMode", e.target.value);
    }
    
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <div className="flex justify-between gap-4 py-4 px-2 bg-white">
      <div className="flex-none w-1/4">
        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-lg"></div>
      </div>

      <div className="flex-1 flex flex-col jusstify-between gap-2">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="text-gray-700">
              <select
                aria-label="Choose purchase frequency"
                name="purchaseMode"
                defaultValue={currentPurchaseMode?.toString() || "false"}
                onChange={handleUpdate}
                className="text-sm text-blue-500 rounded"
              >
              {Object.keys(OrderPurchaseMode).map((mode)=>
                <option key={mode} value={mode} className="capitalize">{mode}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="ml-4 text-red-500"
          >
            <Cross1Icon className="w-6" />
          </button>
        </div>

        <hr className="border-t" />

        <div className="flex items-center justify-between gap-4">
          <div className="text-gray-700">
            <select
              aria-label="Choose item quantity"
              name="quantity"
              defaultValue={currentQuantity}
              onChange={handleUpdate}
              className="w-16 p-1 border border-gray-300 rounded"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>

          <div className="text-gray-700 font-semibold">
            {(Number(currentQuantity) * item.price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
