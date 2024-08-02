import { useFetcher } from "@remix-run/react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { Textarea } from "~/components/textarea";
import { SettingsType } from "~/Dashboard/type/settings.type";

export default function OrderSettings(props: SettingsType) {
  const { profile } = props;
  const order = profile?.preferences.order;

  const fetcher = useFetcher();

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Order Preferences</h2>
      <fetcher.Form method="post">
        <div className="mb-4">
          <Label
            htmlFor="packagingPreferences"
            className="block text-sm font-medium text-gray-700"
          >
            Packaging Preferences
          </Label>
          <Select name="packagingPreferences" defaultValue={order?.packaging}>
            <SelectTrigger id="packagingPreferences" className="mt-1 bg-white">
              <SelectValue placeholder="Select preferred packaging preference" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="eco-friendly">Eco-friendly</SelectItem>
              <SelectItem value="discreet">Discreet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="deliveryInstructions"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery Instructions
          </Label>
          <Textarea
            id="deliveryInstructions"
            name="deliveryInstructions"
            placeholder="Ring the doorbell once and place the package by the door."
            className="mt-1 block w-full rounded-m focus:ring-offset-2"

          />
        </div>
        <Button
          type="submit"
          radius={"md"}
          className="w-full bg-indigo-500 text-white"
        >
          Save
        </Button>
      </fetcher.Form>
    </div>
  );
}
