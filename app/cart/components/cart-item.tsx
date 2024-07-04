import React from 'react';
import { useFetcher } from '@remix-run/react';
import type { IItem } from "~/dashboard/order/order.type";

interface CartItemProps {
  item: IItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const fetcher = useFetcher();
  const currentQuantity = parseFloat(fetcher.formData?.get("quantity")as string) || item.quantity;
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
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-700">
          <label className="block">Qty: </label>
          <select
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
          <label className="block">Subscription: </label>
          <select
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
  );
};

export default CartItem;
