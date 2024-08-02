import { useFetcher } from "@remix-run/react";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";

export default function OrderSettings() {
  const fetcher = useFetcher();

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Order Preferences</h2>
      <fetcher.Form method="post">
        <div className="mb-4">
          <Label
            htmlFor="deliveryInstructions"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery Instructions
          </Label>
          <Input
            type="text"
            name="deliveryInstructions"
            id="deliveryInstructions"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="packagingPreferences"
            className="block text-sm font-medium text-gray-700"
          >
            Packaging Preferences
          </Label>
          <Select name="packagingPreferences">
            <SelectTrigger id="packagingPreferences">
              <SelectValue placeholder={""} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eco-friendly">Eco-friendly</SelectItem>
              <SelectItem value="discreet">Discreet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </fetcher.Form>
    </div>
  );
}
