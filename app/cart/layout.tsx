import { getCartByUserId } from "./cart.server";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";

export const loader = async () => {
  const cart = await getCartByUserId(new mongoose.Types.ObjectId());
  return json({ cart });
};

export default function Layout() {
  const { cart } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-3/4 p-4">
        <Outlet context={{ cart }} />
      </div>

      <div className="lg:w-1/4 p-4 mt-4 lg:mt-0 bg-orange-300 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="mb-2 flex justify-between">
          <span>Subtotal</span>
          <span>$100.00</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Shipping</span>
          <span>$10.00</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Discount</span>
          <span>-$5.00</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Tax</span>
          <span>$8.00</span>
        </div>
        <div className="mt-4 pt-2 border-t flex justify-between font-bold">
          <span>Estimated Total</span>
          <span>$113.00</span>
        </div>
      </div>
    </div>
  );
}
