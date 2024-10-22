import { useFetcher } from "@remix-run/react";
import type { IAddress, IAddressRegion } from "../types/address.type";
import { CART_FETCHER_KEY } from "../types/cart.type";

export interface AddressFormProps {
  address?: IAddress;
  regions: IAddressRegion[];
  action: string;
  onCancel: () => void;
}

export const AddressForm = ({
  address,
  regions,
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
        Address Action
      </label>
      <input id="_action" type="hidden" name="_action" value={action} />

      {address && (
        <>
          <label htmlFor="id" className="sr-only">
            Order Id
          </label>
          <input
            id="id"
            type="hidden"
            name="id"
            value={address._id.toString()}
          />
        </>
      )}
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
        <label htmlFor="address-region" className="block text-gray-700">
          Region
        </label>
        <select
          id="address-region"
          name="region"
          defaultValue={address?.region.name}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          {regions.map((region) => (
            <option key={region.name} value={region.name}>
              <div>{region.city}</div>
              <div>{region.name}</div>
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          defaultValue={address?.email}
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
