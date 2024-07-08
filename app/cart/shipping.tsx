import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import React from "react";
import { AddressItem, type AddressItemProps } from "./components/address";

const ADD_ADDRESS_FORM = "add-new-address";
const SHOW_ADDRESS_FORM = "new-address";

// Handle form submissions in the action
export let action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  switch (actionType) {
    case ADD_ADDRESS_FORM:
      const newAddress = {
        type: formData.get("type"),
        address: formData.get("address"),
        phone: formData.get("phone"),
      };
      // Add logic to save the new address
      return json({ message: "Address added successfully", newAddress });
    default:
      return json({ message: "Unknown action" });
  }
};

// Fetch initial data in the loader
export let loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const showForm = url.searchParams.get(SHOW_ADDRESS_FORM) === "true";
  const addresses: Pick<
    AddressItemProps,
    "type" | "address" | "phone" | "selected"
  >[] = [
    {
      type: "Home",
      address: "3501 Maloy Court, East Elmhurst, New York City, NY 11369",
      phone: "78596 0000",
      selected: true,
    },
    {
      type: "Office",
      address: "8502-8503 Preston Rd. Inglewood Street, Maine 98380",
      phone: "12100 0023",
      selected: false,
    },
  ];
  return json({ addresses, showForm });
};

const ShippingDetails: React.FC = () => {
  const { addresses, showForm } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const toggleFormVisibility = () => {
    if (showForm) {
      fetcher.submit(null, { action: "get" });
    } else {
      fetcher.submit({ SHOW_ADDRESS_FORM: true }, { action: "get" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-lg mr-2">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-semibold">Shipping Details</h1>
      </div>
      {addresses.map((address, index) => (
        <AddressItem
          key={index}
          type={address.type}
          address={address.address}
          phone={address.phone}
          selected={address.selected}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
      {!showForm && (
        <button
          onClick={toggleFormVisibility}
          className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 mb-4"
        >
          + Add New Address
        </button>
      )}
      {showForm && (
        <fetcher.Form method="post" className="border p-4 rounded-lg mb-4">
          <input type="hidden" name="_action" value="add-new-address" />
          <div className="mb-2">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Address</label>
            <input
              name="address"
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Phone</label>
            <input
              name="phone"
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={toggleFormVisibility}
              className="text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </fetcher.Form>
      )}
    </div>
  );
};

export default ShippingDetails;
