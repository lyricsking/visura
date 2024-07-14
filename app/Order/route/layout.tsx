import { getCartByEmailId } from "./cart.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import mongoose from "mongoose";
import { CART_FETCHER_KEY } from "./cart.type";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Button from "~/Shared/components/button";
import { getSession, USER_SESSION_KEY } from "~/Shared/utils/session";
import { IOrderModel } from "~/dashboard/order/order.model";


export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const discountCode = formData.get("discountCode");
  const orderId = formData.get("orderId");

  let discount = 0;

  // Handle discount code application
  if (orderId && discountCode) {
    //  Get the associated discount data from db
    const order = await applyDiscount({orderId, discountCode});
    
    return json({ success: true, data: order });
  }

  return json({ success: false });
};


type LoaderDataType = {
  cart: IOrderModel | null
}

export const loader = async ({ request }:LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  
  const user = session.get(USER_SESSION_KEY);
  //if (!user) return redirect("/");

  const cart: IOrderModel | null = await getCartByEmailId(user["email"]);
  return json<LoaderDataType>({ cart });
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
    <div className="min-h-screen no-scrollbar pb-20 md:pb-0">
      <div className="flex items-center py-2 border-b">
        <Button onClick={() => navigate(-1)} className="text-lg mr-2">
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{currentRoute.handle.name}</h1>
      </div>
      <div className="flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 lg:w-3/4 p-4">
          <Outlet context={{ cart, childMethodRef }} />
        </div>

        <div className="flex-1 lg:w-1/4 p-4 mt-4 lg:mt-0 bg-orange-300 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <fetcher.Form method="post" className="mb-4">
          
            <label for="orderId" class="sr-only">Order Id</label>
            <input type="hidden" id="orderId" name="orderId" value={cart.id} />
    
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
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="mt-4 pt-2 border-t flex justify-between font-bold">
            <span>Estimated Total</span>
            <span>${estimatedTotal.toFixed(2)}</span>
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md md:static md:bg-transparent md:shadow-none flex gap-6 justify-between items-center">
            <div className="font-semibold text-lg md:hidden">
              Total: ${estimatedTotal.toFixed(2)}
            </div>
            <button
              className="flex-1 bg-black text-white px-4 py-2 rounded-md"
              onClick={handleClick}
              disabled={isSubmitting}
            >
              {currentRoute.handle.buttonLabel || ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
