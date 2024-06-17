import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
} from "~/shared/components/ui/page.layout";
import { QuizData, QuizProvider } from "./components/quiz.provider";

export default function Layout() {

  return (
    <PageLayout>
      <PageLayoutContent>
        {/*<QuizProvider quizData={quizData}>*/}
          <Outlet />
       {/* </QuizProvider> */}
      </PageLayoutContent>
    </PageLayout>
  );
}
