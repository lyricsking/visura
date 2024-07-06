import { getCartByUserId } from "./cart.server";
import { json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import { CART_FETCHER_KEY } from "./cart.type";

export const loader = async () => {
  const cart = await getCartByUserId(new mongoose.Types.ObjectId());
  return json({ cart });
};

export default function Layout() {
  const { cart } = useLoaderData<typeof loader>();

  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

  // Optimistic UI for discount and quantity updates
  const totalItems = cart?.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const itemTotal = cart?.items.reduce((total, item) => total + item.total, 0);
  const shipping = 5.99; // Example shipping cost
  const taxRate = 0.08; // Example tax rate (8%)
  const discount = Number(fetcher.formData?.get("discount") || 0);
  const tax = itemTotal || 0 * taxRate;
  const estimatedTotal = itemTotal || 0 + shipping - discount + tax;

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto no-scrollbar">
      <div className="flex-1 lg:w-3/4 p-4">
        <Outlet context={{ cart }} />
      </div>

      <div className="lg:w-1/4 p-4 mt-4 lg:mt-0 bg-orange-300 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <fetcher.Form method="post" className="mb-4" action="?index">
          <label
            htmlFor="discountCode"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Code
          </label>
          <div className="flex mt-1">
            <input
              type="text"
              name="discountCode"
              id="discountCode"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-black text-white rounded-md"
            >
              Apply
            </button>
          </div>
        </fetcher.Form>
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
        <div className="fixed z-30 bottom-0 left-0 right-0 flex justify-end mt-4 px-4">
          <button className="bg-black text-white px-4 py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
