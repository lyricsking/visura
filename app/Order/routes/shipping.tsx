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
import {
  createOrUpdateAddress,
  deleteAddress,
  getAddressesByEmail,
  getAddressRegions,
} from "../server/address.server";
import { IOrder } from "../types/order.type";
import { CART_FETCHER_KEY } from "../types/cart.type";
import { AddressForm } from "../components/address-form";
import { AddressItem } from "../components/address-item";
import { useEffect } from "react";
import { updateCartAddress } from "../server/cart.server";
import { getSession } from "~/utils/session";
import { IAddress, IAddressRegion } from "../types/address.type";
import { getCacheUser } from "~/Auth/server/auth.server";

export const ADD_ADDRESS_ACTION = "create-address";
export const EDIT_ADDRESS_ACTION = "update-address";
export const SELECT_ADDRESS_ACTION = "select-address";
export const DELETE_ADDRESS_ACTION = "delete-address";

export const SHOW_ADDRESS_FORM = "new-address-form";
export const SHOW_EDIT_ADDRESS_FORM = "edit-address";

const addresses: IAddress[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    type: "Home",
    address: "3501 Maloy Court, East Elmhurst, New York City, NY 11369",
    phone: "78596 0000",
  } as IAddress,
  {
    _id: new mongoose.Types.ObjectId(),
    type: "Office",
    address: "8502-8503 Preston Rd. Inglewood Street, Maine 98380",
    phone: "12100 0023",
  } as IAddress,
] as IAddress[];

// Handle form submissions in the action
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const formDataObj: any = {};
  formData.forEach((value, key) => {
    // If the key already exists, it means it's an array
    if (formDataObj[key]) {
      if (!Array.isArray(formDataObj[key])) {
        formDataObj[key] = [formDataObj[key]]; // Convert to array if it's not already
      }
      formDataObj[key].push(value);
    } else {
      formDataObj[key] = value;
    }
  });

  const { _action, orderId, ...newAddress } = formDataObj;

  switch (_action) {
    case EDIT_ADDRESS_ACTION:
    case ADD_ADDRESS_ACTION:
      // Add logic to save the new address
      await createOrUpdateAddress({ address: newAddress });

      return json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });
    case SELECT_ADDRESS_ACTION:
      await updateCartAddress({ orderId: orderId, address: newAddress });

      console.log("select ", formData.get("addressId"));

      return json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });
    case DELETE_ADDRESS_ACTION:
      await deleteAddress(newAddress["_id"]);

      console.log("delete", formData.get("addressId"));

      return json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });
    default:
      return json({ message: "Unknown action" });
  }
};

// Fetch initial data in the loader
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  //  Todo Fetch address and address regions here
  const user = await getCacheUser(session);

  const [addresses, regions] = await Promise.all([
    getAddressesByEmail(user["email"]),
    getAddressRegions(),
  ]);

  return json({ addresses, regions });
};

export const handle = {
  buttonLabel: "Payment Info",
  name: "Shipping",
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    navigate("payment");
  },
};

const ShippingDetails = () => {
  const { addresses, regions } = useLoaderData<typeof loader>();
  const { cart, childMethodRef }: { cart: IOrder; childMethodRef: any } =
    useOutletContext();
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

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

  const handleSelect = (address: IAddress) => {
    fetcher.submit(
      {
        _action: SELECT_ADDRESS_ACTION,
        orderId: cart._id.toString(),
        //...address
      },
      { method: "post" }
    );
  };

  const handleDelete = (id: mongoose.Types.ObjectId) => {
    fetcher.submit(
      {
        _action: DELETE_ADDRESS_ACTION,
        id: id.toString(),
      },
      { method: "post" }
    );
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
      {addresses &&
        addresses.map((address: any) =>
          editingAddressId === address._id ? (
            <AddressForm
              key={address._id}
              address={address}
              regions={regions as IAddressRegion[]}
              action={EDIT_ADDRESS_ACTION}
              onCancel={() => toggleFormVisibility(SHOW_EDIT_ADDRESS_FORM)}
            />
          ) : (
            <AddressItem
              key={address._id}
              address={address}
              selected={cart.address._id.toString()}
              onEdit={() =>
                toggleFormVisibility(SHOW_EDIT_ADDRESS_FORM, address._id)
              }
              onSelect={() => handleSelect(address)}
              onDelete={() => handleDelete(address._id)}
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
          regions={regions as IAddressRegion[]}
          action={ADD_ADDRESS_ACTION}
          onCancel={() => toggleFormVisibility(SHOW_ADDRESS_FORM)}
        />
      )}
    </div>
  );
};

export default ShippingDetails;
