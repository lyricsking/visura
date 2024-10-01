import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Footer from "~/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { LoaderFunction, json } from "@remix-run/node";
import { getUserFromSession } from "~/auth/server/auth.server";
import config from "~/config";

export default function Default() {
  const data = useLoaderData<typeof loader>();
  // const headerIcons = plugins
  //   .filter((plugin) => plugin.headerIcon)
  //   .map((plugin) => plugin.headerIcon);

  return (
    <PageLayout>
      <PageLayoutHeader position={"sticky"}>
        <PageLayoutHeaderItem
          spacing="compact"
          className="max-h-12 border bg-white rounded-b-sm shadow-md"
        >
          <Link to={"/"} replace>
            <h1 className="text-2xl font-bold tracking-tight px-4 py-auto bg-blue">
              {config.app.appName}
            </h1>
          </Link>

          <div className="flex h-full divide-x">
            {/* {headerIcons.map((Icon, index) => Icon && <Icon />)} */}
            <div className="flex-none mx-auto">
              <AccountMenuButton user={data?.user} />
            </div>
          </div>
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <Outlet context={{ user: data.user }} />
      </PageLayoutContent>

      <PageLayoutFooter columns="1" asChild>
        <Footer />
      </PageLayoutFooter>
    </PageLayout>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromSession(request);

  return json({ user: user });
};
