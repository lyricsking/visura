import { Link, Outlet } from "@remix-run/react";
import Footer from "~/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/components/ui/page.layout";
import pkg from "../../package.json";
import { useQuiz } from "~/Quiz/quiz.utils";
import Button from "~/components/button";

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
          <Button
            variant="outline"
            size="sm"
            className="-my-2"
            onClick={() => initQuiz()}
          >
            Get started
          </Button>
          
          { data.user &&  <AccountMenuButton /> }
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

export const loader: LoaderFunction = ({request}) => {
  const user: AuthUser | null = getAuthUser(request);
  
  return json({user:user})
}