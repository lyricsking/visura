import { useEffect, useRef } from "react";
import { IAddress } from "../type/address.type";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";

export interface AddressItemProps {
  address: IAddress
  selected: string;
  onEdit: () => void;
  onSelect: () => void
  onDelete: () => void
}

export const AddressItem = ({
  address: { _id, address, phone, type },
  selected,
  onEdit,
  onSelect,
  onDelete
}: AddressItemProps) => {
  
  const editButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected && editButtonRef.current) {
      editButtonRef.current.focus();
    }
  }, [selected]);

  return (
    <label htmlFor={`address-${type}`}>
      <div
        className={`border p-4 rounded-lg mb-4 cursor-pointer ${
          selected ? "border-black" : "border-gray-300"
        }`}
        role="radio"
        aria-checked={selected===_id.toString()}
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
              defaultChecked={selected === _id.toString()}
              value={_id.toString()}
              readOnly
              className="mr-2"
              aria-labelledby={`address-label-${type}`}
              onClick={onSelect}
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
              onClick={onDelete}
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
