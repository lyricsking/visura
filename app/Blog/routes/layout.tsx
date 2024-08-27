import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Footer from "~/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import { useQuiz } from "~/Quiz/utils/quiz.utils";
import Button from "~/components/button";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { LoaderFunction, json } from "@remix-run/node";
import { getUserFromSession } from "~/Auth/server/auth.server";
import { config } from "@/config";

export default function Layout() {
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
            <div className="flex-none mx-auto">
              <AccountMenuButton />
            </div>
          </div>
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
