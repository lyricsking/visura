import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
} from "~/shared/components/ui/page.layout";
import { QuizData, QuizProvider } from "./components/quiz.provider";

const quizDataFn: () => QuizData = () => {
  return {
    healthgoal: [
      { question: "What is the capital of France?", id: 1 },
      { question: "What is the capital of Germany?", id: 2 },
    ],
    section2: [
      { question: "What is 2 + 2?", id: 1 },
      { question: "What is 3 + 5?", id: 2 },
    ],
    section3: [
      { question: "What is the color of the sky?", id: 1 },
      { question: "What is the color of grass?", id: 2 },
    ],
  };
};

export const loader: LoaderFunction = ({ request }: LoaderFunctionArgs) => {
  const quizData = quizDataFn();
  return json({ quizData });
};

export default function Layout() {
  const { quizData } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <PageLayoutContent>
        <QuizProvider quizData={quizData}>
          <Outlet />
        </QuizProvider>
      </PageLayoutContent>
    </PageLayout>
  );
}
