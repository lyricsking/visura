import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { IAddressModel } from "~/Dashboard/address/address.model";
import { CART_FETCHER_KEY } from "../type/cart.type";

export interface AddressFormProps {
  address?: Pick<IAddressModel, "id" | "type" | "address" | "phone">;
  action: string;
  onCancel: () => void;
}

export const AddressForm = ({
  address,
  action,
  onCancel,
}: AddressFormProps) => {
  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

  return (
    <fetcher.Form
      method="post"
      className="border p-4 rounded-lg mb-4"
      aria-labelledby="address-form-title"
    >
      <h2 id="address-form-title" className="sr-only">
        Address Form
      </h2>
      <label htmlFor="_action" className="sr-only">
        Order Id
      </label>
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
          Save
        </button>
      </div>
    </fetcher.Form>
  );
};
