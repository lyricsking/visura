import { Link } from "@remix-run/react";
import { ReactElement } from "react";

import { GeneralAppSettings } from "../components/general-app-settings";

import Button from "~/shared/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/shared/components/card";
import { Input } from "~/shared/components/input";

import { Package2, Sheet, Menu, Search, CircleUser } from "lucide-react";
import { SheetTrigger, SheetContent } from "~/shared/components/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/components/dropdown.menu";
import { Checkbox } from "~/shared/components/checkbox";
import { SettingsType } from "../../admin/type/settings.type";

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

export default function AdminSettings() {
  return (
    <div className="flex flex-col flex-1 items-start gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-7xl items-start bg-white rounded-md p-4 md:p-8 gap-4 md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] overflow-x-auto">
        <nav
          className="flex w-full overflow-x-auto md:grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link to="#" className="font-semibold text-primary">
            General
          </Link>
          <Link to="#">Security</Link>
          <Link to="#">Integrations</Link>
          <Link to="#">Support</Link>
          <Link to="#">Organizations</Link>
          <Link to="#">Advanced</Link>
        </nav>

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
                <Input
                  placeholder="Project Name"
                  defaultValue="/content/plugins"
                />
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
      </div>
    </div>
  );
}
