import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { SettingsType } from "../type/settings.type";
import { Switch } from "~/components/switch";
import { Label } from "~/components/label";
import { Form, useFetcher } from "@remix-run/react";
import { NOTIFICATION_UPDATE_ACTION } from "../utils/constants";

export default function NotificationSettings({ profile }: SettingsType) {
  const fetcher = useFetcher();

  const notifications = profile?.preferences.notifications;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      <fetcher.Form method="post">
        <input
          type="hidden"
          name="_action"
          value={NOTIFICATION_UPDATE_ACTION}
        />
        <div className="flex flex-col justify-between gap-4 divide-y">
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Order Updates
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="order-updates">
                {notifications?.orderUpdates ? "Enabled" : "Disabled"}
              </Label>
              <Switch id="order-updates" />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Subscription Reminders
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="subscriptionReminders">
                {notifications?.subscriptionReminders ? "Enabled" : "Disabled"}
              </Label>
              <Switch id="subscriptionReminders" />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Promotional Notifications
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="promotional">
                {notifications?.promotional ? "Enabled" : "Disabled"}
              </Label>
              <Switch id="promotional" />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Subscription Reminders
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="supportNotification">
                {notifications?.supportNotification ? "Enabled" : "Disabled"}
              </Label>
              <Switch id="supportNotification" />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Preferred Support Channel
            </h3>
            <Label htmlFor="preferredSupportChannel">
              {notifications?.supportNotification ? "Enabled" : "Disabled"}
            </Label>
            <Select name="preferredSupportChannel">
              <SelectTrigger
                id="preferredSupportChannel"
                className="flex bg-white"
              >
                <SelectValue
                  placeholder={notifications?.preferredSupportChannel}
                />
              </SelectTrigger>
              <SelectContent className=" bg-white">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
