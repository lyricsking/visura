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
import { getCacheUser } from "~/Auth/server/auth.server";
import { AuthUser } from "~/Auth/types/auth-user.type";
import { CartIcon } from "../components/cart-icon";
import { IHydratedUser } from "~/User/models/user.model";

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  const { startQuiz } = useQuiz();

  return (
    <PageLayout>
      <PageLayoutHeader position={"sticky"}>
        <PageLayoutHeaderItem className="max-h-12 border p-0 rounded-b-sm shadow-md">
          <Link to={"/"} replace>
            <h1 className="text-2xl font-bold tracking-tight px-4 py-auto bg-blue">
              {pkg.name}.
            </h1>
          </Link>

          <div className="flex h-full divide-x">
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
              <AccountMenuButton profile={data?.user?.profile} />
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
  const user = await getCacheUser(request);
  console.log("auth user:", user);

  return json({ user: user });
};
