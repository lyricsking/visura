import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { lazy } from "react";
import {
  PROFILE_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  ACCOUNT_UPDATE_ACTION,
  NOTIFICATION_UPDATE_ACTION,
  DISPLAY_UPDATE_ACTION,
  ORDER_UPDATE_ACTION,
} from "../utils/constants";
import { renderToString } from "react-dom/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
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
import { updateUserPassword, disableUser } from "~/core/user/server/user.server";
import { IUserProfile } from "~/core/user/types/user-profile.type";
import formDataToObject from "~/core/utils/form-data-to-object";
import { getSession, commitSession } from "~/core/utils/session";

export const handle = {~/utils/form-data-to-object
  pageName: "Settings",~/utils/session
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

export default function Settings() {
  const { tab, component, data } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();
  const params = useParams();

  const onSettingChange = (newSetting: string) => {
    alert(JSON.stringify(newSetting, null, 2));

    navigate(`/administration/settings/${newSetting}`);
  };

  const Tag = lazy(() => import(/* @vite-ignore */ `/app/${component}`));

  return (
    <Tabs defaultValue={tab} onValueChange={onSettingChange}>
      <TabsList className="border-violet-400 overflow-x-auto no-scrollbar">
        {Object.keys(settings).map((key, index) => (
          <TabsTrigger key={key} value={key} className="capitalize">
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent key={tab} value={tab} className="h-fit">
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
  const settingTab = params.setting || "account";

  const route = settings.find((route) => route.path === settingTab);

  // Todo use the settingTab to fetch appropriate data to be modified
  if (route) {
    const data = (route.loader && route.loader({})) || null;
    const DynamicComponent = (
      await import(/* @vite-ignore */ `~/${route.component}`)
    ).default;

    return json({
      tab: settingTab,
      component: renderToString(<DynamicComponent {...data} />),
      data: data,
    });
  }

  let session = await getSession(request);
  return json({ tab: settingTab, component: null, data: null });
};
