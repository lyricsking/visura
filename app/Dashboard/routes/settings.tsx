import { ActionFunction, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
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
import PrivacySettings from "../components/privacy-settings";
import OrderSettings from "~/Order/components/order-settings";
import HealthPreferences from "../components/health-settings";
import HealthSettings from "../components/health-settings";
import PaymentSettings from "~/Transaction/components/payment-settings";
import { getSession } from "~/utils/session";
import { AuthUser } from "~/Auth/types/auth-user.type";
import { authenticator } from "~/Auth/server/auth.server";
import { getUserById } from "~/User/server/user.server";
import { SchemaTypeOptions, Types } from "mongoose";
import { getProfileByUserId } from "~/User/server/user-profile.server";
import { SettingsType } from "../type/settings.type";

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
  privacy: PrivacySettings,
  order: OrderSettings,
  health: HealthSettings,
  payment: PaymentSettings,
};

export default function Settings() {
  const { profile, setting, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const params = useParams();

  const onSettingChange = (newSetting: string) => {
    alert(newSetting)
    navigate(`/dashboard/settings/${newSetting}`);
  };

  const { sidebarMenuRef }: any = useOutletContext();
  if (sidebarMenuRef) {
    sidebarMenuRef.current = () => null;
  }

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
            {
              <Tag
                profile={profile as SettingsType["profile"]}
                user={user as SettingsType["user"]}
              />
            }
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const settingsType = params.setting || "account";
  
  // Manually get the session
  let session = await getSession(request.headers.get("cookie"));
  
  const authUser: AuthUser = session.get(authenticator.sessionKey);
  
  const [user, profile] = await Promise.all([
    await getUserById(new Types.ObjectId(authUser.id)),
    await getProfileByUserId(new Types.ObjectId(authUser.id)),
  ])
  return json({ profile: profile, setting: settingsType, user: user });
};

export const action: ActionFunction = async ({ request }) => {
  // Manually get the session
  let session = await getSession(request.headers.get("cookie"));
  
  const authUser: AuthUser = session.get(authenticator.sessionKey);
  
  const formData = await request.formData();
  const formObject = formDataToObject(formData);
  
  const { _action, otherData } = formObject;
  
  let userId = new Types.ObjectId(authUser.id);
  
  if (_action === PROFILE_UPDATE_ACTION) {
    await updateUserProfile(userId, {name: otherData["name"]});
  } else if (_action === PASSWORD_UPDATE_ACTION) {
    await updateUserPassword(userId, otherData["currentPassword"], otherData["newPassword"]);
  } else if (_action === ACCOUNT_UPDATE_ACTION) {
    await disableUser(formData.get('userId'));
    return redirect('/logout');
  } else if(_action === NOTIFICATION_UPDATE_ACTION) {
    await updateUserProfile(userId, {
      notifications: {...otherData}
    });
  } else if(_action === DISPLAY_UPDATE_ACTION) {
    await updateUserProfile(userId, {
      display: {...otherData}
    });
  } else if (_action === ORDER_UPDATE_ACTION) {
    await updateUserProfile(userId, {
      order: { ...otherData }
    });
  }
};
