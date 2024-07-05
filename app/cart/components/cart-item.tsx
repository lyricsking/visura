import React from 'react';
import { useFetcher } from '@remix-run/react';
import type { IItem } from "~/dashboard/order/order.type";

interface CartItemProps {
  item: IItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const fetcher = useFetcher();
  const currentQuantity = parseFloat(fetcher.formData?.get("quantity") as string) || item.quantity;
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
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="w-1/5">
        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center space-x-4 divide-y">
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
        </div>
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
          <span className="block">Price: ${item.price.toFixed(2)}</span>
        </div>
        <div className="text-gray-700">
          <select
            aria-label="Choose purchase frequency"
            name="isSubscribe"
            value={currentSubscription?.toString() || "false"}
            onChange={handleUpdate}
            className="text-sm text-blue-500"
          >
            <option value="false">One-time purchase</option>
            <option value="true">Subscription</option>
          </select>
        </div>
        <div className="text-gray-700 font-semibold">
          Total: ${(Number(currentQuantity) * item.price).toFixed(2)}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
