import { useEffect, useRef } from "react";

export interface AddressItemProps {
  address: Pick<Address, "type","address", "phone">
  selected: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const AddressItem = ({
  type,
  address,
  phone,
  selected,
  onEdit,
  onDelete,
}: AddressItemProps) => {
  const editButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected && editButtonRef.current) {
      editButtonRef.current.focus();
    }
  }, [selected]);

  return (
    <div
      className={`border p-4 rounded-lg mb-4 ${
        selected ? "border-black" : "border-gray-300"
      }`}
      role="radiogroup"
      aria-labelledby={`address-item-${type}`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="address"
            defaultChecked={selected}
            readOnly
            aria-labelledby={`address-item-${type}`}
            className="mr-2"
          />
          <span id={`address-item-${type}`} className="font-semibold">
            {type}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-500"
            aria-label={`Edit ${type} address`}
            ref={editButtonRef}
          >
            <i className="fas fa-edit" aria-hidden="true"></i>
          </button>
          <button
            onClick={onDelete}
            className="text-red-500"
            aria-label={`Delete ${type} address`}
          >
            <i className="fas fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <p>{address}</p>
      <p className="text-gray-500">Phone no.: {phone}</p>
    </div>
  );
};

export interface AddressFormProps {
  address: Pick<Address, "type","address", "phone">;
  action: string;
  onCancel: () => void;
}

export const AddressForm = ({
  address, action, onCancel, onSubmit
}: AddressFormProps) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      method="post"
      className="border p-4 rounded-lg mb-4"
      aria-labelledby="address-form-title"
    >
      <input type="hidden" name="_action" value={action} />
      <h2 id="address-form-title" className="sr-only">Address Form</h2>
      <div className="mb-2">
        <label htmlFor="address-type" className="block text-gray-700">Type</label>
        <select
          id="address-type"
          name="type"
          defaultValue={address.type}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="address" className="block text-gray-700">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={address.address}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
          aria-required="true"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="phone" className="block text-gray-700">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          defaultValue={address.phone}
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
