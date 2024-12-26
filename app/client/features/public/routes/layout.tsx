import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import AccountMenuButton from "~/shared/components/ui/account-menu-button";
import Footer from "~/shared/components/ui/footer";
import {
  PageLayout,
  PageLayoutHeader,
  PageLayoutHeaderItem,
  PageLayoutContent,
  PageLayoutFooter,
} from "~/shared/components/ui/page.layout";
import { APP_NAME, getAppContext } from "~/app";
import { getUserFromSession } from "~/features/user/server/user.server";
import { IHydratedUser } from "~/features/user/models/user.model";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUserFromSession(request);

  const app = await getAppContext();
  return json({ config: { appName: app.config(APP_NAME) }, user: user! });
};

export default function Default() {
  const { config, user } = useLoaderData<typeof loader>();

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
              {config.appName}
            </h1>
          </Link>

          <div className="flex h-full divide-x">
            {/* {headerIcons.map((Icon, index) => Icon && <Icon />)} */}
            <div className="flex-none mx-auto">
              <AccountMenuButton user={user as IHydratedUser} />
            </div>
          </div>
        </PageLayoutHeaderItem>
      </PageLayoutHeader>

      <PageLayoutContent>
        <Outlet context={{ user: user }} />
      </PageLayoutContent>

      <PageLayoutFooter columns="1" asChild>
        <Footer />
      </PageLayoutFooter>
    </PageLayout>
  );
}
