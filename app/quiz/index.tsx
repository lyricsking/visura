import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { createCart, recommendSupplements } from "./quiz.server";
import {
  ClientLoaderFunctionArgs,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import Button from "~/shared/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import OptionsHandler from "./components/options.handler";
import { Progress } from "~/shared/components/progress";
import { useEffect } from "react";
import { Answers, Question } from "./quiz.type";
import type { ISupplement } from "~/supplement/supplement.type";
import { useQuiz } from "./quiz.utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const answersString = formData.get("answers") as string;
  const supplements: ISupplement[] = await recommendSupplements(
    JSON.parse(answersString)
  );

  if (supplements) {
    try {
      await createCart(supplements);

      return json({ success: true });
    } catch (error) {
      return json({
        success: false,
        message: "Failed to convert supplements into order.",
      });
    }
  }
};
export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const questionId = url.searchParams.get("id");

  if (questionId) return json({ questionId });
  return redirect("/");
};

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const { questionId } = await serverLoader<typeof loader>();
  return { questionId };
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return (
    <div className="flex flex-col h-screen items-center justify-center ">
      <p className="text-center">Loading quiz...</p>
    </div>
  );
}

export default function Index() {
  //  Retrieve loader data
  const { questionId } = useLoaderData<typeof clientLoader>();

  const { answers, getQuestion, getProgress, previousQuestion, saveAnswer } =
    useQuiz();

  //  Obtain the current question by questionId
  const question: Question = getQuestion(questionId);

  //const currentAnswer = answers[questionId];

  const progress = getProgress(questionId);

  //  Init navigator
  const navigate = useNavigate();
  const gotoQuestion = (id: string) => {
    navigate(`/quiz?id=${id}`);
  };

  //  init submit function to submit quiz
  const quizResponse = useFetcher();
  const isSubmitting = quizResponse.state !== "idle";
  const isSubmitted = quizResponse.state === "idle" && quizResponse.data;

  useEffect(() => {
    if (isSubmitted) {
      navigate(`/cart`);
    }
  }, [navigate, isSubmitted]);

  /** Saves the current quiz's answer and move to the next quiz or finish the quiz if otherwise. */
  const handleNext = (answer: string) => {
    const nextQuestionId = saveAnswer(questionId as keyof Answers, answer);

    if (!nextQuestionId && progress.ratio >= 1) {
      quizResponse.submit(
        {
          answers: JSON.stringify(answers()),
        },
        {
          method: "post",
          action: "/quiz?index",
        }
      );
    } else if (nextQuestionId) {
      gotoQuestion(nextQuestionId);
    }
  };

  const handlePrevious = () => {
    if (progress.ratio > 0) {
      const prevId = previousQuestion(questionId);

      gotoQuestion(prevId);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {isSubmitting ? (
        <div className="flex-1 self-center items-center justify-center">
          Loading...
        </div>
      ) : (
        <>
          <div className="border-b">
            <Button
              variant="text"
              size="sm"
              className="border-e gap-2 h-12"
              onClick={() => handlePrevious()}
              disabled={progress.ratio === 0}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Button>
          </div>

          <Progress
            value={progress.ratio * 100}
            className="h-4 w-full rounded-none"
            indicatorColor="bg-indigo-400"
          />

          <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
            {question.question}
          </h3>

          <div className="flex-1 my-6 p-2 w-full">
            <OptionsHandler
              answerType={question.type}
              currentAnswer={"answer"}
              onAnswerSelected={() => {}}
              options={question.options}
            />
          </div>

          <div className="flex flex-col gap-4 fixed z-20 bottom-8 right-0 left-0">
            <Button
              variant={"fill"}
              radius={"full"}
              className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
              onClick={() => handleNext("Your answer")}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting"
                : progress.currentIndex === progress.lastIndex - 1
                ? "Finish"
                : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
