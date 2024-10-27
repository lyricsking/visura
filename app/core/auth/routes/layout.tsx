import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
import { getAppContext } from "~/app";
import Button from "~/core/components/button";
import {
  PageLayout,
  PageLayoutHeader,
  PageLayoutHeaderItem,
  PageLayoutContent,
} from "~/core/components/ui/page.layout";

export const loader = async () => {
  const app = await getAppContext();

  return json({ appName: "" });
};

export default function Layout() {
  const { appName } = useLoaderData<typeof loader>();
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
