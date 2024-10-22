import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";

import Button from "~/components/button";
import { withContext } from "~/core/utils/context-loader";
export const loader = withContext(({ app }) => {
  return json({ appName: app?.configs.appName });
});
export default function Layout() {
  const { appName } = useLoaderData<typeof loader>();
  return (
    <PageLayout className="bg-gray-100 max-h-screen overflow-y-auto no-scrollbar">
      <PageLayoutHeader>
        <PageLayoutHeaderItem className="border">
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
