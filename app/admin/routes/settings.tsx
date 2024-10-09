import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { ReactElement, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

import ProfileSettings from "../components/profile-settings";
import NotificationSettings from "../components/notification-settings";
import DisplaySettings from "../components/display-settings";
import { commitSession, getSession } from "~/utils/session";
import {
  getUserFromSession,
  logout,
  invalidateCacheUser,
} from "~/auth/server/auth.server";
import OrderSettings from "~/tempPlugins/SubscriptionBox/Order/components/order-settings";
import { IHydratedUser } from "~/user/models/user.model";
import {
  updateUserProfile,
  updateUserPreference,
} from "~/user/server/user-profile.server";
import { updateUserPassword, disableUser } from "~/user/server/user.server";
import { IUserProfile } from "~/user/types/user-profile.type";
import formDataToObject from "~/utils/form-data-to-object";
import { SettingsType } from "../type/settings.type";
import {
  PROFILE_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  ACCOUNT_UPDATE_ACTION,
  NOTIFICATION_UPDATE_ACTION,
  DISPLAY_UPDATE_ACTION,
  ORDER_UPDATE_ACTION,
} from "../utils/constants";
import PluginSetting from "../components/plugin-settings";

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "settings",
    label: "Settings",
    //path: "/dashboard/settings",
  },
};

const settingsKeys: Record<string, (props: SettingsType) => ReactElement> = {
  account: ProfileSettings,
  notifications: NotificationSettings,
  //display: DisplaySettings,
  //privacy: PrivacySettings,
  //order: OrderSettings,
  //health: HealthSettings,
  //payment: PaymentSettings,
  plugin: PluginSetting,
};

export default function Settings() {
  const { setting } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();
  const params = useParams();

  const onSettingChange = (newSetting: string) => {
    alert(JSON.stringify(newSetting, null, 2));

    navigate(`/administration/settings/${newSetting}`);
  };

  const Tag = settingsKeys[setting as keyof typeof settingsKeys];

  return (
    <Tabs defaultValue={setting} onValueChange={onSettingChange}>
      <TabsList className="border-violet-400 overflow-x-auto no-scrollbar">
        {Object.keys(settingsKeys).map((key, index) => (
          <TabsTrigger key={key} value={key} className="capitalize">
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent key={setting} value={setting} className="h-fit">
        {<Tag user={user as IHydratedUser} />}
      </TabsContent>
    </Tabs>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserFromSession(request);

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const { _action, ...otherData } = formObject;

  let userId = user?.id;
  if (!userId) throw Error("ggg");
  if (_action === PROFILE_UPDATE_ACTION) {
    const [firstName, lastName] = otherData["name"].split(" ");
    await updateUserProfile(userId, { firstName, lastName });
  } else if (_action === PASSWORD_UPDATE_ACTION) {
    await updateUserPassword(
      userId,
      otherData["currentPassword"],
      otherData["newPassword"]
    );
  } else if (_action === ACCOUNT_UPDATE_ACTION) {
    let user = await disableUser(userId);
    await logout(request, { redirectTo: "/" });
  } else if (_action === NOTIFICATION_UPDATE_ACTION) {
    let notification: IUserProfile["preferences"]["notifications"] = {
      orderUpdates: otherData["orderUpdates"] === "true" ? true : false,
      subscriptionReminders:
        otherData["subscriptionReminders"] === "true" ? true : false,
      promotional: otherData["promotional"] === "true" ? true : false,
      supportNotification:
        otherData["supportNotification"] === "true" ? true : false,
      preferredSupportChannel: otherData["preferredSupportChannel"] || "chat",
    };
    await updateUserPreference(userId, "notifications", notification);
  } else if (_action === DISPLAY_UPDATE_ACTION) {
    await updateUserPreference(userId, "display", otherData);
  } else if (_action === ORDER_UPDATE_ACTION) {
    await updateUserPreference(userId, "order", otherData);
  } else {
    return null;
  }

  const session = await getSession(request);
  await invalidateCacheUser(session);

  return json({}, { headers: { "Set-Cookie": await commitSession(session) } });
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const settingsType = params.setting || "account";
  console.log(settingsType);
  // Todo use the settingsType to fetch appropriate data to be modified
  let session = await getSession(request);

  return json({ setting: settingsType });
};
