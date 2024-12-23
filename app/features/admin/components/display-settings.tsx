import { useFetcher } from "react-router";
import { Label } from "~/shared/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/components/select";
import Button from "~/shared/components/button";
import { SettingsType } from "../type/settings.type";
import { DISPLAY_UPDATE_ACTION } from "../utils/constants";

export default function DisplaySettings({ user: { profile } }: SettingsType) {
  const fetcher = useFetcher();

  const display = profile?.preferences.display;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Display Settings</h2>
      <fetcher.Form method="post">
        <input type="hidden" name="_action" value={DISPLAY_UPDATE_ACTION} />
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Theme
          </Label>
          <Select name="theme" defaultValue={display?.theme}>
            <SelectTrigger id="name" className="mt-1 flex bg-white">
              <SelectValue placeholder={"Set preferred theme"} />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Language
          </Label>
          <Select name="language" defaultValue={display?.language}>
            <SelectTrigger id="language" className="mt-1 flex bg-white">
              <SelectValue placeholder="Set preferred language setting" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency
          </Label>
          <Select name="currency" defaultValue={display?.currency}>
            <SelectTrigger id="currency" className="mt-1 flex bg-white">
              <SelectValue placeholder="Set preferred currency setting" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          radius={"md"}
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
          disabled={fetcher.state !== "idle"}
        >
          {fetcher.state === "idle" ? "Update Display" : "Updating..."}
        </Button>
      </fetcher.Form>
    </div>
  );
}
