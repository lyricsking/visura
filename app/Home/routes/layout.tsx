import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Footer from "~/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import pkg from "../../../package.json";
import { useQuiz } from "~/Quiz/quiz.utils";
import Button from "~/components/button";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { LoaderFunction, json } from "@remix-run/node";
import { getAuthUser } from "~/Auth/server/auth.server";
import { AuthUser } from "~/Auth/types/auth-user.type";

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  const { initQuiz } = useQuiz();

  return (
    <PageLayout>
      <PageLayoutHeader position={"sticky"}>
        <PageLayoutHeaderItem className="border bg-white">
          <Link to={"/"} replace>
            <h1 className="text-[28px] font-bold tracking-tight">
              {pkg.name}.
            </h1>
          </Link>

          <div className="flex gap-2 -my-2">
            <Button
              variant="outline"
              size="sm"
              radius="md"
              onClick={() => initQuiz()}
            >
              Get started
            </Button>

            <AccountMenuButton />
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

export const loader: LoaderFunction = async ({ request }) => {
  const user: AuthUser | null = await getAuthUser(request);

  return json({ user: user });
};
