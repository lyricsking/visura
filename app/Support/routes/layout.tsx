import { Link, Outlet, useMatches } from "@remix-run/react";
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
import { MutableRefObject, useRef } from "react";

export type OutletContextChildRefObject = {
  title: string;
  description?: string;
  backLinkLabel?: string;
  backLinkPath?: string;
};

export type OutletContextType = {
  childHeaderRef: MutableRefObject<OutletContextChildRefObject | null>;
};

export default function Layout() {
  const { initQuiz } = useQuiz();

  let outletContext: Partial<OutletContextType> = {
    childHeaderRef: useRef<OutletContextChildRefObject | null>(null),
  };

  return (
    <PageLayout className="bg-gray-100">
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
        </PageLayoutHeaderItem>

        {outletContext.childHeaderRef && (
          <PageLayoutHeaderItem className="relative justify-center border bg-gray-300">
            <div className="text-center sm:py-2 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {outletContext.childHeaderRef.current?.title}
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                {outletContext.childHeaderRef.current?.description}
              </p>
            </div>
          </PageLayoutHeaderItem>
        )}

        {outletContext.childHeaderRef?.current &&
          outletContext.childHeaderRef.current?.backLinkPath && (
            <PageLayoutHeaderItem className="border bg-white">
              <Link
                to={outletContext.childHeaderRef.current?.backLinkPath}
                className="text-blue-500 underline mt-2 block"
              >
                {outletContext.childHeaderRef.current?.backLinkLabel ||
                  "Go back"}
              </Link>
            </PageLayoutHeaderItem>
          )}
      </PageLayoutHeader>

      <PageLayoutContent>
        <Outlet context={outletContext} />
      </PageLayoutContent>

      <PageLayoutFooter columns="1" asChild>
        <Footer />
      </PageLayoutFooter>
    </PageLayout>
  );
}
