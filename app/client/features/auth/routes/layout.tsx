import { Button } from "@mantine/core";
import { Link, Outlet } from "@remix-run/react";
import { APP_NAME } from "~/app";
import {
  PageLayout,
  PageLayoutHeader,
  PageLayoutHeaderItem,
  PageLayoutContent,
} from "~/client/components/ui/page.layout";

export default function Layout() {
  const appName = "";

  return (
    <PageLayout className="bg-white max-h-screen overflow-y-auto no-scrollbar">
      <PageLayoutHeader>
        <PageLayoutHeaderItem spacing="compact" className="border">
          <Link to={"/"} replace>
            <h1 className="text-[28px] font-bold tracking-tight">{appName}</h1>
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
