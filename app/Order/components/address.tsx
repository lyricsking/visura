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

    onSubmit(addressId);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
    <label>
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
    </Form>
  );
};

export interface AddressFormProps {
  address?: Pick<IAddress, "type" | "address" | "phone">;
  action: string;
  onCancel: () => void;
}

export const AddressForm = ({
  address,
  action,
  onCancel,
}: AddressFormProps) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      method="post"
      className="border p-4 rounded-lg mb-4"
      aria-labelledby="address-form-title"
    >
      <h2 id="address-form-title" className="sr-only">
        Address Form
      </h2>
      <label for="_action" class="sr-only">Order Id</label>
      <input id="_action" type="hidden" name="_action" value={action} />
    
      <div className="mb-2">
        <label htmlFor="address-type" className="block text-gray-700">
          Type
        </label>
        <select
          id="address-type"
          name="type"
          defaultValue={address?.type}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="address" className="block text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={address?.address}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
          aria-required="true"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="phone" className="block text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          defaultValue={address?.phone}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
          aria-required="true"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-700"
          aria-label="Cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md"
          aria-label="Add"
        >
          Add
        </button>
      </div>
    </fetcher.Form>
  );
};
