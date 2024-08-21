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
import { commitSession, getSession } from "~/utils/session";
import { AuthUser } from "~/Auth/types/auth-user.type";
import {
  disableUser,
  findUserById,
  updateUserPassword,
} from "~/User/server/user.server";
import mongoose, { SchemaTypeOptions, Types } from "mongoose";
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
import { getCacheUser, invalidateCacheUser, logout, setCacheUser } from "~/Auth/server/auth.server";
import { useUser } from "~/hooks/use-user";
import { loader as userLoader } from "~/User/routes/user.resource";
import { IHydratedUser } from "~/User/models/user.model";
import { fi } from "@faker-js/faker";

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
  display: DisplaySettings,
  //privacy: PrivacySettings,
  order: OrderSettings,
  //health: HealthSettings,
  //payment: PaymentSettings,
};

export default function Settings() {
  const { setting } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();
  const params = useParams();

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
            {<Tag user={user as IHydratedUser} />}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const user = await getCacheUser(request);

  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  const { _action, ...otherData } = formObject;

  let userId = user?.id;
if(!userId)throw Error("ggg")
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

  const session = await getSession(request.headers.get("Cookie"));
  await invalidateCacheUser(session)
  
  return json({}, { headers: { "Set-Cookie": await commitSession(session) } });
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const settingsType = params.setting || "account";
  // Todo use the settingsType to fetch appropriate data to be modified
  let session = await getSession(request.headers.get("Cookie"));

  return json(
    { setting: settingsType},
  );
};
