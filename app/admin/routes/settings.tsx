import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  Outlet,
  ShouldRevalidateFunction,
  ShouldRevalidateFunctionArgs,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import {
  PROFILE_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  ACCOUNT_UPDATE_ACTION,
  NOTIFICATION_UPDATE_ACTION,
  DISPLAY_UPDATE_ACTION,
  ORDER_UPDATE_ACTION,
} from "../utils/constants";
import { logout } from "~/core/auth/server/auth.server";
import { IHydratedUser } from "~/core/user/models/user.model";
import {
  updateUserProfile,
  updateUserPreference,
} from "~/core/user/server/user-profile.server";
import {
  updateUserPassword,
  getUserFromSession,
  invalidateCacheUser,
} from "~/core/user/server/user.server";
import formDataToObject from "~/core/utils/form-data-to-object";
import { getSession, commitSession } from "~/core/utils/session";
import NotificationSettings from "../components/notification-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";
import ProfileSettings from "./profile-settings";

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "settings",
    label: "Settings",
    //path: "/dashboard/settings",
  },
};

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
    await logout(request, { redirectTo: "/" });
  } else if (_action === NOTIFICATION_UPDATE_ACTION) {
    // let notification: IUserMeta[""]["notifications"] = {
    //   orderUpdates: otherData["orderUpdates"] === "true" ? true : false,
    //   subscriptionReminders:
    //     otherData["subscriptionReminders"] === "true" ? true : false,
    //   promotional: otherData["promotional"] === "true" ? true : false,
    //   supportNotification:
    //     otherData["supportNotification"] === "true" ? true : false,
    //   preferredSupportChannel: otherData["preferredSupportChannel"] || "chat",
    // };
    // await updateUserPreference(userId, "notifications", notification);
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const tab = new URL(request.url).pathname.split("/")[3];
  console.log(tab);
  // if (!tab) {
  //   return redirect("/administration/settings/general");
  // }

  return json({ tab: tab });
};

/**
 * By default settings layout route will not revalidate when
 * switching tab, this is RemixJs optimization which prevents
 * leaf route (Outlet) content from updating.
 *
 * @param args `ShouldRevalidateFunctionArgs`
 * @returns `boolean` if the routes should revalidate
 */
export const shouldRevalidate = ({
  currentUrl,
  defaultShouldRevalidate,
  nextUrl,
}: ShouldRevalidateFunctionArgs) => {
  const currentTab = currentUrl.pathname.split("/")[3];
  const nextTab = nextUrl.pathname.split("/")[3];

  if (currentTab !== nextTab) return true;

  return defaultShouldRevalidate;
};

export default function Settings() {
  const { tab } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();

  const onSettingChange = (newSetting: string) => {
    // alert(JSON.stringify(newSetting, null, 2));
    navigate(`/administration/settings/${newSetting}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-8">
      <Tabs defaultValue={tab} onValueChange={onSettingChange}>
        <TabsList className="bg-white border-violet-400 rounded-t-md overflow-x-auto no-scrollbar">
          <TabsTrigger value="" className="capitalize">
            General
          </TabsTrigger>
          <TabsTrigger value="display" className="capitalize">
            Display
          </TabsTrigger>
          <TabsTrigger value="policy" className="capitalize">
            Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="h-fit">
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
