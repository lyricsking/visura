import { Link, Outlet } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/shared/components/ui/page.layout";
import pkg from "../../package.json";
import Button from "~/shared/components/button";

export default function Layout() {
  return (
    <PageLayout>
      <PageLayoutHeader>
        <PageLayoutHeaderItem className="border">
          <Link to={"/"} replace>
            <h1 className="text-[28px] font-bold tracking-tight">
              {pkg.name}.
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
        <Outlet context={{ appname: pkg.name }} />
      </PageLayoutContent>
    </PageLayout>
  );
}
