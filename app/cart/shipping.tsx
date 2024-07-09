import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  NavigateFunction,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import React from "react";
import { AddressForm, AddressItem } from "./components/address";
import { IAddressModel } from "~/dashboard/address/address.model";
import mongoose from "mongoose";

const ADD_ADDRESS_FORM = "create-address";
const EDIT_ADDRESS_FORM = "update-address";
const SHOW_ADDRESS_FORM = "new-address-form";
const SHOW_EDIT_ADDRESS_FORM = "edit-address";

// Handle form submissions in the action
export const action = async ({ request }: ActionFunctionArgs) => {
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
export const loader = async () => {
  const addresses: IAddressModel[] = [
    {
      _id: new mongoose.Types.ObjectId(),
      type: "Home",
      address: "3501 Maloy Court, East Elmhurst, New York City, NY 11369",
      phone: "78596 0000",
    } as IAddressModel,
    {
      _id: new mongoose.Types.ObjectId(),
      type: "Office",
      address: "8502-8503 Preston Rd. Inglewood Street, Maine 98380",
      phone: "12100 0023",
    } as IAddressModel,
  ] as IAddressModel[];

  return json({ addresses });
};

export const handle = {
  buttonLabel: "Payment",
  name: "Shipping",
  onSubmit: (navigate: NavigateFunction) => {
    navigate("payment");
  },
};

const ShippingDetails = () => {
  const { addresses } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const showForm = searchParams.get(SHOW_ADDRESS_FORM);
  const editingAddressId = searchParams.get(SHOW_EDIT_ADDRESS_FORM);

  const toggleFormVisibility = (action: string, value?: string) => {
    if (value) {
      setSearchParams(
        (prev) => {
          prev.set(action, value);
          return prev;
        },
        {
          replace: true,
        }
      );
    } else {
      setSearchParams(
        (prev) => {
          prev.delete(action);
          return prev;
        },
        {
          replace: true,
        }
      );
    }
  };

  const handleDelete = (addressId: string) => {
    fetcher.submit(
      { addressId },
      { method: "post", action: "/delete-address" }
    );
  };

  const fetcher = useFetcher();

  return (
    <div className="container mx-auto p-4">
      {addresses.map((address: any, index) =>
        editingAddressId === address.id ? (
          <AddressForm
            key={address._id}
            address={address}
            action="EDIT_ADDRESS_FORM"
            onCancel={() => toggleFormVisibility(SHOW_EDIT_ADDRESS_FORM)}
          />
        ) : (
          <AddressItem
            key={address._id}
            address={address}
            onEdit={() =>
              toggleFormVisibility(SHOW_EDIT_ADDRESS_FORM, address._id)
            }
            onDelete={() => handleDelete(address._id)}
            selected={false}
          />
        )
      )}
      {!showForm && (
        <button
          onClick={() => toggleFormVisibility(SHOW_ADDRESS_FORM, "true")}
          className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 mb-4"
        >
          + Add New Address
        </button>
      )}
      {showForm && (
        <AddressForm
          action="EDIT_ADDRESS_FORM"
          onCancel={() => toggleFormVisibility(SHOW_ADDRESS_FORM)}
        />
      )}
    </div>
  );
};

export default ShippingDetails;
