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
    <div className="grid grid-cols-1 md:grid-cols-12 border rounded-md">
      <div className="col-span-9 bg-white">
        <Outlet context={{ cart }} />
      </div>

      <div className="col-span-3 bg-orange-300">
        <div></div>
      </div>
    </div>
  );
}
