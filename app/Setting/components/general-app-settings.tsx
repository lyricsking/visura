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

export function GeneralAppSettings() {
  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Store Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>
            The directory within your project, in which your plugins are
            located.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input placeholder="Project Name" defaultValue="/content/plugins" />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" defaultChecked />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
