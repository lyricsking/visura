import { Link, Outlet
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

export type OutletContextType = {
    title: string,
    description: string
    backLinkLabel?: string
    backLinkPath?: string
} 

export default function Layout() {
  const { initQuiz } = useQuiz();

  const childHeaderRef = useRef<OutletContextType | null>(null);
  
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
        
        {childHeaderRef && <PageLayoutHeaderItem className="border bg-white">
          <div className=" bg-gray-300 py-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">{childHeaderRef.title}</h1>
            <p className="mt-2 text-lg text-gray-700">{childHeaderRef.description}
            </p>
          </div>
        </PageLayoutHeaderItem>}
        
        {childHeaderRef&& childHeaderRef.backLinkPath&&<PageLayoutHeaderItem className="border bg-white">
            <Link to={childHeaderRef.backLinkPath} className="text-blue-500 underline mt-2 block">{childHeaderRef.backLinkLabel || "Go back"}</Link>
        </PageLayoutHeaderItem>}
      </PageLayoutHeader>
      
      <PageLayoutContent>
        <Outlet context={childHeaderRef} />
      </PageLayoutContent>

      <PageLayoutFooter columns="1" asChild>
        <Footer />
      </PageLayoutFooter>
    </PageLayout>
  );
}