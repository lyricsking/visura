import { Link, Outlet } from "react-router";
import Footer from "~/shared/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/shared/components/ui/page.layout";
import Button from "~/shared/components/button";

export default function Layout() {
  return (
    <PageLayout>
      <PageLayoutHeader>
        <PageLayoutHeaderItem spacing={"compact"} className="bg-white">
          <Link to={"/"} replace>
            <h1 className="text-2xl font-bold tracking-tight">{"app name"}</h1>
          </Link>

          <Button variant="outline" className=" hidden bg-gray-100" radius="md">
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
