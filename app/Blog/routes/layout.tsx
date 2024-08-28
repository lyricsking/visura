import { Link, Outlet } from "@remix-run/react";
import Footer from "~/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { config } from "@/config";
import Button from "~/components/button";

export default function Layout() {
  return (
    <PageLayout>
      <PageLayoutHeader>
        <PageLayoutHeaderItem spacing={"compact"} className="bg-white">
          <Link to={"/"} replace>
            <h1 className="text-2xl font-bold tracking-tight">
              {config.appName}
            </h1>
          </Link>

          <Button variant="outline" className="bg-gray-100" radius="md">
            Login
          </Button>
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
