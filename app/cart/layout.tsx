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

  const matches = useMatches();
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });
  const navigate = useNavigate();

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
  //  Use to handle button clicks to navigate through the checkout process.
  //  It validates the currect section e.g shipping and then navigate to the next checkout flow.
  const handleClick = () => {
    const onSubmit = ([...matches].reverse()).find(
      (route) => route.handle && route.handle.onSubmit
    );
    
    return onSubmit && onSubmit(navigate)
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto no-scrollbar">
      <div className="flex-1 lg:w-3/4 p-4">
        <Outlet context={{ cart }} />
      </div>

      <div className="lg:w-1/4 p-4 mt-4 mb-20 lg:mt-0 lg:mb-0 bg-orange-300 rounded shadow">
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
          <span>${itemTotal.toFixed(2)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Tax</span>
          <span>${taxRate.toFixed(2)}</span>
        </div>
        <div className="mt-4 pt-2 border-t flex justify-between font-bold">
          <span>Estimated Total</span>
          <span>${estimatedTotal.toFixed(2)}</span>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md md:static md:bg-transparent md:shadow-none flex gap-6 justify-between items-center">
          <div className="font-semibold text-lg md:hidden">
            Total: ${estimatedTotal.toFixed(2)}
          </div>
          <button className="flex-1 bg-black text-white px-4 py-2 rounded-md" onClick={handleClick}>
            {([...matches].reverse()).find(
              (route) => route.handle && route.handle.name
            )||null}
          </button>
        </div>
      </div>
    </div>
  );
}
