import { getCartByEmailId } from "../server/cart.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import mongoose from "mongoose";
import { CART_FETCHER_KEY } from "../types/cart.type";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Button from "~/components/button";
import { useRef } from "react";
import { applyDiscount } from "../server/cart.server";
import type { IOrder } from "../types/order.type";
import { getAuthUser } from "~/core/Auth/server/auth.server";
import EmptyCart from "../components/empty-cart";
import Cart from "./cart";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const discountCode = formData.get("discountCode");
  const orderId = formData.get("orderId");

  let discount = 0;

  // Handle discount code application
  if (orderId && discountCode) {
    //  Get the associated discount data from db
    const order = await applyDiscount({ orderId, code: discountCode });

    return json({ success: true, data: order });
  }

  return json({ success: false });
};

type LoaderDataType = {
  cart: IOrder | null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getAuthUser(request);

  let cart: IOrder | null = null;
  if (user) {
    cart = await getCartByEmailId(user["email"]);
  }
  return json<LoaderDataType>({ cart: cart });
};

export default function Layout() {
  const { cart } = useLoaderData() as LoaderDataType;

  const matches = useMatches();
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });
  const navigate = useNavigate();

  const childMethodRef = useRef<any>(null);

  // Optimistic UI for discount and quantity updates
  const totalItems = cart?.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const itemTotal =
    cart?.items.reduce((total, item) => total + item.total, 0) || 0;
  const shipping = 5.99; // Example shipping cost
  const taxRate = 0.08; // Example tax rate (8%)
  const discount = Number(fetcher.formData?.get("discount") || 0);
  const tax = (itemTotal || 0) * taxRate;
  const estimatedTotal = (itemTotal || 0) + shipping - discount + tax;
  const txnFee = estimatedTotal * (1.4 / 100);

  const currentRoute: any = matches.at(-1);

  //  Use to handle button clicks to navigate through the checkout process.
  //  It validates the currect section e.g shipping and then navigate to the next checkout flow.
  const handleClick = () => {
    if (childMethodRef.current) {
      childMethodRef.current();
    }
  };

  const isSubmitting = fetcher.state !== "idle";

  return (
    <PageLayout className="bg-gray-100">
      <PageLayoutHeader position={"sticky"}>
        <PageLayoutHeaderItem className="border bg-white">
          <div className="flex items-center justify-center">
            <Button onClick={() => navigate(-1)} className="text-lg mr-2">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">
              {currentRoute.handle.name}
            </h1>
          </div>
        </PageLayoutHeaderItem>
      </PageLayoutHeader>
      <PageLayoutContent className="mb-16 md:mb-0">
        {!cart ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex-1 h-full bg-white px-8 md:py-8">
              <Outlet
                context={{ amount: estimatedTotal, cart, childMethodRef }}
              />
            </div>

            <div className="flex flex-col md:w-2/6 py-4 px-8 md:px-10 bg-orange-300 -mt-1 md:mt-0 rounded-t md:rounded-none shadow-md">
              <h2 className="text-lg md:text-2xl font-bold mb-4">
                Order Summary
              </h2>
              <fetcher.Form method="post" className="mb-4">
                <label htmlFor="orderId" className="sr-only">
                  Order Id
                </label>
                <input
                  type="hidden"
                  id="orderId"
                  name="orderId"
                  value={cart?._id.toString()}
                />

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

              <div className="flex-1" />

              <div className="">
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
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="mt-4 pt-2 border-t flex justify-between font-bold">
                  <span>Estimated Total</span>
                  <span>${estimatedTotal.toFixed(2)}</span>
                </div>
                <div className="mt-6 flex justify-between">
                  <span>Transaction Fee</span>
                  <span>${txnFee.toFixed(2)}</span>
                </div>

                <div className="fixed z-40 bottom-0 right-0 left-0 md:static flex gap-6 py-4 px-8 md:px-0 justify-between items-center bg-white md:bg-transparent">
                  <div className="flex-1 font-semibold text-lg md:hidden">
                    Total: ${estimatedTotal.toFixed(2)}
                  </div>
                  <Button
                    radius="md"
                    className="flex-1 bg-black text-white py-2 px-4"
                    onClick={handleClick}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Updating cart..."
                      : currentRoute.handle.buttonLabel +
                          " (" +
                          estimatedTotal.toFixed(2) +
                          ")" || ""}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageLayoutContent>
    </PageLayout>
  );
}
