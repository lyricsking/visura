import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { IAddressModel } from "~/Dashboard/address/address.model";
import { CART_FETCHER_KEY } from "../type/cart.type";
import {
  DELETE_ADDRESS_ACTION,
  SELECT_ADDRESS_ACTION,
} from "../route/shipping";

export interface AddressItemProps {
  address: Pick<IAddressModel, "_id" | "address" | "type" | "phone">;
  selected: boolean;
  onEdit: () => void;
}

export const AddressItem = ({
  address: { _id, address, phone, type },
  selected,
  onEdit,
}: AddressItemProps) => {
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

  const formRef = useRef<HTMLFormElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected && editButtonRef.current) {
      editButtonRef.current.focus();
    }
  }, [selected]);

  const handleSelect = (addressId: string) => {
    fetcher.submit(
      { _action: SELECT_ADDRESS_ACTION, addressId: addressId },
      { method: "post" }
    );
  };

  const handleDelete = (addressId: string) => {
    fetcher.submit(
      { _action: DELETE_ADDRESS_ACTION, addressId: addressId },
      { method: "post" }
    );
  };

  return (
    <label htmlFor={`address-${type}`}>
      <div
        className={`border p-4 rounded-lg mb-4 cursor-pointer ${
          selected ? "border-black" : "border-gray-300"
        }`}
        role="radio"
        aria-checked={selected}
        tabIndex={0}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            // Focus and trigger click on the radio button
            document.getElementById(`address-${type}`)?.click();
          }
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <input
              type="radio"
              id={`address-${type}`}
              name="addressId"
              defaultChecked={selected === _id}
              value={_id as string}
              readOnly
              className="mr-2"
              aria-labelledby={`address-label-${type}`}
              onClick={() => handleSelect(_id as string)}
            />
            <span id={`address-label-${type}`} className="font-semibold">
              {type}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the container click event
                onEdit();
              }}
              className="text-blue-500"
              aria-label={`Edit ${type} address`}
            >
              <Pencil1Icon className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the container click event
                handleDelete(_id as string);
              }}
              className="text-red-500"
              aria-label={`Delete ${type} address`}
            >
              <Cross1Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p>{address}</p>
        <p className="text-gray-500">Phone no.: {phone}</p>
      </div>
    </label>
  );
};