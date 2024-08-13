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

export type ChildMetaObject = {
  title: string;
  description?: string;
  backLinkLabel?: string;
  backLinkPath?: string;
};

export type OutletContextDataType = {
  childMetaObjectFn: Dispatch<SetStateAction<ChildMetaObject | undefined>>;
};

export default function Layout() {
  const { initQuiz } = useQuiz();

  const [childMetaObject, setChildMetaObject] = useState<ChildMetaObject>();

  let outletContext: Partial<OutletContextDataType> = {
    childMetaObjectFn: setChildMetaObject,
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

        {childMetaObject && (
          <PageLayoutHeaderItem className="relative justify-center border bg-gray-300">
            <div className="text-center sm:py-2 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {childMetaObject.title}
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                {childMetaObject.description}
              </p>
            </div>
          </PageLayoutHeaderItem>
        )}

        {childMetaObject && childMetaObject.backLinkPath && (
          <PageLayoutHeaderItem className="border bg-white">
            <Link
              to={childMetaObject.backLinkPath}
              className="text-blue-500 underline mt-2 block"
            >
              {childMetaObject.backLinkLabel || "Go back"}
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
