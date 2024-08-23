import { Checkbox } from "@radix-ui/react-checkbox";
import { Link } from "@remix-run/react";
import Button from "~/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/card";
import { Input } from "~/components/input";
import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

import ProfileSettings from "../components/profile-settings";
import NotificationSettings from "../components/notification-settings";
import DisplaySettings from "../components/display-settings";
import OrderSettings from "~/Order/components/order-settings";
import { commitSession, getSession } from "~/utils/session";
import { AuthUser } from "~/Auth/types/auth-user.type";
import { disableUser, updateUserPassword } from "~/User/server/user.server";
import {
  updateUserPreference,
  updateUserProfile,
} from "~/User/server/user-profile.server";
import { SettingsType } from "../../Dashboard/type/settings.type";
import formDataToObject from "~/utils/form-data-to-object";
import {
  ACCOUNT_UPDATE_ACTION,
  DISPLAY_UPDATE_ACTION,
  NOTIFICATION_UPDATE_ACTION,
  ORDER_UPDATE_ACTION,
  PASSWORD_UPDATE_ACTION,
  PROFILE_UPDATE_ACTION,
} from "../../Dashboard/utils/constants";
import { IUserProfile } from "~/User/types/user-profile.type";
import {
  getUserFromSession,
  invalidateCacheUser,
  logout,
} from "~/Auth/server/auth.server";
import { IHydratedUser } from "~/User/models/user.model";
import { GeneralAppSettings } from "../components/general-app-settings";

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "overview",
    label: "Overview",
  },
};

const settingsKeys: Record<string, (props: SettingsType) => ReactElement> = {
  General: GeneralAppSettings,
  //Security: NotificationSettings,
  //Integrations: DisplaySettings,
  //Support: OrderSettings,
  //Organizations: HealthSettings,
  //Advanced: PaymentSettings,
};

export default function Settings() {
  const { setting } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();
  const params = useParams();

  const onSettingChange = (newSetting: string) => {
    navigate(`/dashboard/settings/${newSetting}`);
  };

  const Tag = settingsKeys[setting as keyof typeof settingsKeys];

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <Tabs defaultValue={setting} onValueChange={onSettingChange}>
          <TabsList className="border-violet-400 overflow-x-auto no-scrollbar">
            {Object.keys(settingsKeys).map((key, index) => (
              <TabsTrigger key={key} value={key} className="capitalize">
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={setting} className="h-fit">
            {<Tag user={user as IHydratedUser} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const settingsType = params.setting || "General";
  // Todo use the settingsType to fetch appropriate data to be modified
  let session = await getSession(request);

  return json({ setting: settingsType });
};
