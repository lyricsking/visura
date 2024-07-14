import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { type IAddress } from "~/dashboard/address/address.type";

export interface AddressItemProps {
  address: Pick<IAddressModel, "address" | "type" | "phone">;
  selected: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSubmit: (addressId: string) => void;
}

export const AddressItem = ({
  address: { _id, address, phone, type },
  selected,
  onEdit,
  onDelete,
  onSubmit
}: AddressItemProps) => {
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });
  
  const formRef = useRef<HTMLFormElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (selected && editButtonRef.current) {
      editButtonRef.current.focus();
    }
  }, [selected]);
  
  
  const handleSelect = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const addressId = formData.get("address") as string;

    if (!addressId) {
      return;
    }

    //  onSubmit(addressId);
  };

  return (
    <fetcher.Form ref={formRef} onSubmit={handleSubmit}>
    <label htmlFor={`address-${type}`}>
      <div
        className={`border p-4 rounded-lg mb-4 cursor-pointer ${
          selected ? "border-black" : "border-gray-300"
        }`}
        role="radio"
        aria-checked={selected}
        tabIndex={0}
        onClick={handleSelect}
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
              name="address"
              defaultChecked={selected === _id}
              value={_id}
              readOnly
              className="mr-2"
              aria-labelledby={`address-label-${type}`}
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
                onDelete();
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
    </fetcher.Form>
  );
};
