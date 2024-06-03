import { Link, Outlet } from "@remix-run/react";
import Footer from "~/shared/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/shared/components/ui/page.layout";
import pkg from "../../package.json";
import Button from "~/shared/components/button";
import AccountButton from "~/shared/components/ui/account.menu.button";

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
          {true ? (
            <Button
              variant={"outline"}
              radius={"md"}
              className="text-md font-semibold"
            >
              <Link to="/auth/signin">Sign In</Link>
            </Button>
          ) : (
            <AccountButton />
          )}
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <Outlet />
      </PageLayoutContent>

      <PageLayoutFooter columns="1" asChild>
        <Footer />
      </PageLayoutFooter>
    </PageLayout>
  );
}
