import { Outlet } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
} from "~/Shared/components/ui/page.layout";

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