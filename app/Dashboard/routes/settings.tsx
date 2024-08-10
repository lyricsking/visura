import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  useFetcher,
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
import PrivacySettings from "../components/privacy-settings";
import OrderSettings from "~/Order/components/order-settings";
import HealthPreferences from "../components/health-settings";
import HealthSettings from "../components/health-settings";
import PaymentSettings from "~/Transaction/components/payment-settings";
import { getSession } from "~/utils/session";
import { AuthUser } from "~/Auth/types/auth-user.type";
import {
  disableUser,
  getUserById,
  updateUserPassword,
} from "~/User/server/user.server";
import { SchemaTypeOptions, Types } from "mongoose";
import {
  getProfileByUserId,
  updateUserPreference,
  updateUserProfile,
} from "~/User/server/user-profile.server";
import { SettingsType } from "../type/settings.type";
import formDataToObject from "~/utils/form-data-to-object";
import {
  ACCOUNT_UPDATE_ACTION,
  DISPLAY_UPDATE_ACTION,
  NOTIFICATION_UPDATE_ACTION,
  ORDER_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  PROFILE_UPDATE_ACTION,
} from "../utils/constants";
import { IUserProfile } from "~/User/types/user-profile.type";
import { getAuthUser } from "~/Auth/server/auth.server";
import { useUser } from "~/hooks/use-user";
import { loader as userLoader } from "~/User/routes/user.resource";

const settingsKeys: Record<string, (props: SettingsType) => ReactElement> = {
  account: ProfileSettings,
  notifications: NotificationSettings,
  display: DisplaySettings,
  //privacy: PrivacySettings,
  order: OrderSettings,
  //health: HealthSettings,
  //payment: PaymentSettings,
};

export default function Settings() {
  const { setting } = useLoaderData<typeof loader>();
  const { user, sidebarMenuRef }: any = useOutletContext();

  const navigate = useNavigate();
  const params = useParams();

  if (sidebarMenuRef) {
    sidebarMenuRef.current = () => null;
  }

  const onSettingChange = (newSetting: string) => {
    navigate(`/dashboard/settings/${newSetting}`);
  };

  return (
    <Tabs defaultValue={setting} onValueChange={onSettingChange}>
      <TabsList className="border-violet-400 overflow-x-auto no-scrollbar">
        {Object.keys(settingsKeys).map((key, index) => (
          <TabsTrigger key={key} value={key} className="capitalize">
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.keys(settingsKeys).map((key, index) => {
        const Tag = settingsKeys[key as keyof typeof settingsKeys];

        return (
          <TabsContent key={key} value={key} className="h-fit">
            {<Tag authUser={user} />}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const authUser: AuthUser = await getAuthUser(request);

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const { _action, ...otherData } = formObject;

  let userId = new Types.ObjectId(authUser.id);
  // let userId = new Types.ObjectId();

  if (_action === PROFILE_UPDATE_ACTION) {
    const [firstName, lastName] = otherData["name"].split(" ");
    return await updateUserProfile(userId, { firstName, lastName });
  } else if (_action === PASSWORD_UPDATE_ACTION) {
    await updateUserPassword(
      userId,
      otherData["currentPassword"],
      otherData["newPassword"]
    );
  } else if (_action === ACCOUNT_UPDATE_ACTION) {
    await disableUser(userId);
    return redirect("/logout");
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
    return await updateUserPreference(userId, "notifications", notification);
  } else if (_action === DISPLAY_UPDATE_ACTION) {
    return await updateUserPreference(userId, "display", otherData);
  } else if (_action === ORDER_UPDATE_ACTION) {
    return await updateUserPreference(userId, "order", otherData);
  } else {
    return null;
  }
};

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "settings",
    label: "Settings",
    //path: "/dashboard/settings",
  },
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const settingsType = params.setting || "account";

  return json({ setting: settingsType });
};
