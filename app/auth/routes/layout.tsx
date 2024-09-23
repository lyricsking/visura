import { Link, Outlet } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";

import Button from "~/components/button";
import config from "~/config";

export default function Layout() {
  return (
    <PageLayout className="bg-gray-100 max-h-screen overflow-y-auto no-scrollbar">
      <PageLayoutHeader>
        <PageLayoutHeaderItem className="border">
          <Link to={"/"} replace>
            <h1 className="text-[28px] font-bold tracking-tight">
              {config.appName}
            </h1>
          </Link>
          <Button
            variant={"outline"}
            radius={"md"}
            className="text-md font-semibold"
          >
            <Link to="/auth/signup">Sign Up</Link>
          </Button>
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <Outlet context={{}} />
      </PageLayoutContent>
    </PageLayout>
  );
}
