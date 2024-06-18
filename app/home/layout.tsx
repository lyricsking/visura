import { Link, Outlet } from "@remix-run/react";
import Footer from "~/shared/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/shared/components/ui/page.layout";
import pkg from "../../package.json";
import { useQuiz } from "~/quiz/utils/quiz";
import Button from "~/shared/components/button";

export default function Layout() {
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
         <Button
            variant="outline"
            size="sm"
            className="-my-2"
            onClick={()=>startQuiz()}
          >
            Get started
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
