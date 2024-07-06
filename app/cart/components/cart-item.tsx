import React from "react";
import { useFetcher } from "@remix-run/react";
import type { IItem } from "~/dashboard/order/order.type";
import { CART_FETCHER_KEY } from "../cart.type";

interface CartItemProps {
  item: IItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

  const currentQuantity =
    parseFloat(fetcher.formData?.get("quantity") as string) || item.quantity;
  const currentSubscription =
    fetcher.formData?.get("isSubscribe") || item.isSubscribe;

  const handleUpdate = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const formData = new FormData();

    formData.append("productId", item.productId.toString());
    formData.append("quantity", currentQuantity.toString());
    formData.append("isSubscribe", currentSubscription?.toString() || "false");

    if (e.target.name === "quantity") {
      formData.set("quantity", e.target.value);
    } else if (e.target.name === "isSubscribe") {
      formData.set("isSubscribe", e.target.value);
    }

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <div className="flex justify-between gap-4 py-4 px-2 bg-white">
      <div className="flex-none w-1/4">
        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-lg"></div>
      </div>

      <div className="flex-1 flex flex-col jusstify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <div className="text-gray-700">
            <select
              aria-label="Choose purchase frequency"
              name="isSubscribe"
              value={currentSubscription?.toString() || "false"}
              onChange={handleUpdate}
              className="text-sm text-blue-500 rounded"
            >
              <option value="false">One-time purchase</option>
              <option value="true">Subscription</option>
            </select>
          </div>
        </div>

        <hr className="border-t" />

        <div className="flex items-center justify-between gap-4">
          <div className="text-gray-700">
            <select
              aria-label="Choose item quantity"
              value={currentQuantity}
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
