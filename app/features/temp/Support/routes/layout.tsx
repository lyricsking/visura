import { Link, Outlet, ShouldRevalidateFunction, useMatches } from "react-router";
import { config } from "dotenv";
import { APP_NAME } from "~/app";
import Button from "~/shared/components/button";
import Footer from "~/shared/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem,
} from "~/shared/components/ui/page.layout";
import { useQuiz } from "~/features/temp/SubscriptionBox/Quiz/utils/quiz.utils";
import { useAppContext } from "~/shared/providers/app.provider.tsx";

export type ChildHeaderObject = {
  title: string;
  description?: string;
  backLinkLabel?: string;
  backLinkPath?: string;
};

export type HandleObjectType = {
  getHeaderObject: (data: any) => ChildHeaderObject;
};

export default function Layout() {
  const { startQuiz } = useQuiz();

  const app = useAppContext();

  const matches = useMatches();
  const currentRoute: any = matches.at(-1);

  let headerObject: ChildHeaderObject = {
    title: "Support Center",
    description: "How can we assist you today?",
  };

  if (currentRoute.handle && currentRoute.handle.getHeaderObject) {
    headerObject = currentRoute.handle.getHeaderObject(currentRoute.data);
  }

  return (
    <PageLayout className="bg-gray-100">
      <PageLayoutHeader position={"sticky"}>
        <PageLayoutHeaderItem className="border bg-white">
          <Link to={"/"} replace>
            <h1 className="text-[28px] font-bold tracking-tight">
              {app.config(APP_NAME)}
            </h1>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="-my-2"
            onClick={() => startQuiz()}
          >
            Get started
          </Button>
        </PageLayoutHeaderItem>

        {headerObject && (
          <PageLayoutHeaderItem className="relative justify-center border bg-gray-300">
            <div className="text-center sm:py-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {headerObject.title}
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                {headerObject.description}
              </p>
            </div>
          </PageLayoutHeaderItem>
        )}

        {headerObject && headerObject.backLinkPath && (
          <PageLayoutHeaderItem className="border bg-white">
            <Link
              to={headerObject.backLinkPath}
              className="text-blue-500 underline mt-2 block"
            >
              {headerObject.backLinkLabel || "Go back"}
            </Link>
          </PageLayoutHeaderItem>
        )}
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
