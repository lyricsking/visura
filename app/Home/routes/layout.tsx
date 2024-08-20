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
import { useQuiz } from "~/Quiz/utils/quiz.utils";
import Button from "~/components/button";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { LoaderFunction, json } from "@remix-run/node";
import { getSessionUser } from "~/Auth/server/auth.server";
import { AuthUser } from "~/Auth/types/auth-user.type";
import { CartIcon } from "../components/cart-icon";
import { IHydratedUser } from "~/User/models/user.model";

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  const { startQuiz } = useQuiz();

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
              onClick={() => startQuiz()}
              className="hidden"
            >
              Get started
            </Button>
            <CartIcon />
            <div className="flex-none mx-auto">
              <AccountMenuButton profile={data.user} />
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
  const user: IHydratedUser = await getSessionUser(request);

  return json({ user: user });
};
