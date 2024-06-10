import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  PageLayout,
  PageLayoutContent,
} from "~/shared/components/ui/page.layout";
import { QuizData, QuizProvider } from "./components/quiz.provider";

const quizDataFn: QuizData = {
  healthGoal: [
    {
      id: "primaryHealthGoal",
      question: "What is your primary health goal?",
      type: "single",
      options: [
        "Weight Loss",
        "Muscle Gain",
        "Improve Energy",
        "General Wellness",
      ],
    },
    {
      id: "secondaryHealthGoal",
      question: "Do you have any secondary health goals?",
      type: "single",
      options: [
        "Improve Digestion",
        "Better Sleep",
        "Stress Reduction",
        "Increased Flexibility",
      ],
    },
  ],
  dietaryPreference: [
    {
      id: "dietaryPreference",
      question: "Do you follow any specific dietary preferences?",
      type: "single",
      options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"],
    },
  ],
  foodAvoidances: [
    {
      id: "foodAvoidances",
      question:
        "Are there any foods you need to avoid? (Select all that apply)",
      type: "multiple",
      options: ["Dairy", "Soy", "Nuts", "Processed Foods"],
    },
  ],
  exerciseFrequency: [
    {
      id: "exerciseFrequency",
      question: "How often do you exercise?",
      type: "single",
      options: ["Daily", "3-5 times a week", "1-2 times a week", "Rarely"],
    },
  ],
  sleepHours: [
    {
      id: "sleepHours",
      question: "How many hours do you usually sleep each night?",
      type: "single",
      options: [
        "Less than 5 hours",
        "5-7 hours",
        "7-9 hours",
        "More than 9 hours",
      ],
    },
  ],
  healthConcerns: [
    {
      id: "healthConcerns",
      question: "Do you have any health concerns? (Select all that apply)",
      type: "multiple",
      options: ["Diabetes", "Hypertension", "Allergies", "None"],
    },
  ],
} as const;
export type QuizDataKey = keyof typeof quizDataFn;

export const loader: LoaderFunction = ({ request }: LoaderFunctionArgs) => {
  const quizData = quizDataFn;
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
