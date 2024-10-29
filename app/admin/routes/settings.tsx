import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import {
  PROFILE_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  ACCOUNT_UPDATE_ACTION,
  NOTIFICATION_UPDATE_ACTION,
  DISPLAY_UPDATE_ACTION,
  ORDER_UPDATE_ACTION,
} from "../utils/constants";
import {
  getUserFromSession,
  logout,
  invalidateCacheUser,
} from "~/core/auth/server/auth.server";
import { IHydratedUser } from "~/core/user/models/user.model";
import {
  updateUserProfile,
  updateUserPreference,
} from "~/core/user/server/user-profile.server";
import {
  updateUserPassword,
  disableUser,
} from "~/core/user/server/user.server";
import { IUserProfile } from "~/core/user/types/user-profile.type";
import formDataToObject from "~/utils/form-data-to-object";
import { getSession, commitSession } from "~/utils/session";
import AccountSettings from "../components/account-settings";
import NotificationSettings from "../components/notification-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";
import ProfileSettings from "../components/profile-settings";

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "settings",
    label: "Settings",
    //path: "/dashboard/settings",
  },
};

const settings: any[] = [
  {
    path: "account",
    component: "admin/components/account-settings.tsx",
  },
  {
    path: "notifications",
    component: "admin/components/notification-settings.tsx",
  },
  //display: DisplaySettings,
  //privacy: PrivacySettings,
  //order: OrderSettings,
  //health: HealthSettings,
  //payment: PaymentSettings,
  {
    path: "",
    component: "",
  },
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const settingTab = params.setting || "account";

  let session = await getSession(request);
  return json({ tab: settingTab, component: null, data: null });
};

export default function Settings() {
  const { tab, component, data } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();
  const params = useParams();

  const onSettingChange = (newSetting: string) => {
    // alert(JSON.stringify(newSetting, null, 2));
    navigate(`/administration/settings/${newSetting}`);
  };

  return (
    <Tabs defaultValue={tab} onValueChange={onSettingChange}>
      <TabsList className="border-violet-400 overflow-x-auto no-scrollbar">
        <TabsTrigger value="account" className="capitalize">
          Account
        </TabsTrigger>

        <TabsTrigger value="notifications" className="capitalize">
          Notification
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="h-fit">
        <ProfileSettings user={user} />
      </TabsContent>

      <TabsContent value="notifications" className="h-fit">
        <NotificationSettings user={user} />
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
