import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/components/select";
import { Switch } from "~/shared/components/switch";
import { Label } from "~/shared/components/label";
import { Form, useFetcher } from "react-router";
import Button from "~/shared/components/button";
import { SettingsType } from "../type/settings.type";
import { NOTIFICATION_UPDATE_ACTION } from "../utils/constants";

export default function NotificationSettings({ user }: SettingsType) {
  const { profile } = user;

  const fetcher = useFetcher();

  const notifications = profile?.preferences.notifications;
  console.log(notifications);

  const isOrderUpdateChecked =
    fetcher.formData?.get("orderUpdates") === "true" ||
    notifications?.orderUpdates;

  const isSubscriptionRemindersChecked =
    fetcher.formData?.get("subscriptionReminders") === "true" ||
    notifications?.subscriptionReminders;

  const isPromotionalChecked =
    fetcher.formData?.get("promotional") === "true" ||
    notifications?.promotional;

  const isSupportNotificationChecked =
    fetcher.formData?.get("supportNotification") === "true" ||
    notifications?.supportNotification;

  console.log(
    isOrderUpdateChecked,
    isSubscriptionRemindersChecked,
    isSupportNotificationChecked,
    isPromotionalChecked
  );
  return (
    <div className="mt-6 px-4 py-5 sm:p-6 space-y-6 bg-white shadow sm:rounded-b-lg">
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
              <Label htmlFor="orderUpdates">
                {isOrderUpdateChecked ? "Enabled" : "Disabled"}
              </Label>
              <Switch
                id="orderUpdates"
                name="orderUpdates"
                defaultChecked={isOrderUpdateChecked}
                value="true"
              />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Subscription Reminders
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="subscriptionReminders">
                {isSubscriptionRemindersChecked ? "Enabled" : "Disabled"}
              </Label>
              <Switch
                id="subscriptionReminders"
                name="subscriptionReminders"
                defaultChecked={isSubscriptionRemindersChecked}
                value="true"
              />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Promotional Notifications
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="promotional">
                {isPromotionalChecked ? "Enabled" : "Disabled"}
              </Label>
              <Switch
                id="promotional"
                name="promotional"
                defaultChecked={isPromotionalChecked}
                value="true"
              />
            </div>
          </div>
          <div className="py-2">
            <h3 className="block text-sm font-medium text-gray-700">
              Supprt Notifications
            </h3>
            <div className="mt-1 flex items-center justify-between space-x-2">
              <Label htmlFor="supportNotification">
                {isSupportNotificationChecked ? "Enabled" : "Disabled"}
              </Label>
              <Switch
                id="supportNotification"
                name="supportNotification"
                defaultChecked={isSupportNotificationChecked}
                value="true"
              />
            </div>
          </div>
          <div className="py-2" hidden aria-hidden>
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
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={fetcher.state !== "idle"}
            radius={"md"}
            className=" text-white bg-indigo-600"
          >
            {fetcher.state === "idle" ? "Update Notifications" : "Updating..."}
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
