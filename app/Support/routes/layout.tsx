import {
  Link,
  Outlet,
  ShouldRevalidateFunction,
  useMatches,
} from "@remix-run/react";
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
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

export type ChildHeaderObject = {
  title: string;
  description?: string;
  backLinkLabel?: string;
  backLinkPath?: string;
};

export type HandleObjectType = {
  getHeaderObject: (data: any) => ChildHeaderObject
};

export default function Layout() {
  const { initQuiz } = useQuiz();

  const matches = useMatches();
  const currentRoute: any = matches.at(-1);
  
  let headerObject: ChildHeaderObject;
  if(currentRoute.handle && currentRoute.getHeaderObject){
    headerObject = currentRoute.handle.getHeaderObject(currentRoute.data)
  }

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

        {headerObject && (
          <PageLayoutHeaderItem className="relative justify-center border bg-gray-300">
            <div className="text-center sm:py-2 text-center">
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
