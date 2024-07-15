import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  NavigateFunction,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";
import mongoose from "mongoose";
import { IAddressModel } from "~/Dashboard/address/address.model";
import { createOrUpdateAddress } from "../server/address.server";
import { IAddress } from "~/Dashboard/address/address.type";
import { IOrder } from "../type/order.type";
import { CART_FETCHER_KEY } from "../type/cart.type";
import { AddressForm } from "../components/address-form";
import { AddressItem } from "../components/address-item";
import { useEffect } from "react";

export const ADD_ADDRESS_ACTION = "create-address";
export const EDIT_ADDRESS_ACTION = "update-address";
export const SELECT_ADDRESS_ACTION = "select-address";
export const DELETE_ADDRESS_ACTION = "delete-address";

export const SHOW_ADDRESS_FORM = "new-address-form";
export const SHOW_EDIT_ADDRESS_FORM = "edit-address";

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

// Handle form submissions in the action
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  switch (actionType) {
    case ADD_ADDRESS_ACTION:
      const newAddress = {
        type: formData.get("type"),
        address: formData.get("address"),
        phone: formData.get("phone"),
      };

      // Add logic to save the new address
      await createOrUpdateAddress({ address: newAddress as IAddress });

      return json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });

    case EDIT_ADDRESS_ACTION:
      // code

      break;
    case SELECT_ADDRESS_ACTION:
      console.log("select ", formData.get("addressId"));
      break;
    case DELETE_ADDRESS_ACTION:
      console.log("delete", formData.get("addressId"));
      break;
  }
  return json({ message: "Unknown action" });
};

// Fetch initial data in the loader
export const loader = async () => {
  //  Todo Fetch address and address regions here
  return json({ addresses });
};

export const handle = {
  buttonLabel: "Payment",
  name: "Shipping",
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    navigate("payment");
  },
};

const ShippingDetails = () => {
  const { addresses } = useLoaderData<typeof loader>();
  const { cart, childMethodRef }: { cart: IOrder; childMethodRef: any } =
    useOutletContext();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (childMethodRef) {
      childMethodRef.current = () => {
        if (Array.isArray(cart.items) && cart.items.length > 0) {
          return navigate("/cart/payment");
        }

        alert("No Items added to cart");
      };
    }
  }, [childMethodRef]);

  return (
    <div className="container mx-auto p-4">
      {addresses.map((address: any, index) =>
        editingAddressId === address._id ? (
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
