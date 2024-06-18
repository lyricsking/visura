import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { quizPrefs } from "./utils/quiz.server";
import { Answers, Question, QuizAction, filterQuestions } from "./utils/quiz";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Button from "~/shared/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import OptionsHandler from "./components/options.handler";
import { Progress } from "~/shared/components/progress";
import { useEffect } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await quizPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();

  const action = formData.get("action");
  if (action === QuizAction.cacheQuestions && formData.has("questions")) {
    const questions = JSON.parse(formData.get("questions") as string);

    cookie.questions = questions;

    return json(
      { questions },
      {
        headers: {
          "Set-Cookie": await quizPrefs.serialize(cookie),
        },
      }
    );
  } else if (action === QuizAction.cacheAnswers) {
    const answers = formData.get("answers") as string;

    cookie.answers = JSON.parse(answers);

    return json(
      { success: true },
      {
        headers: {
          "Set-Cookie": await quizPrefs.serialize(cookie),
        },
      }
    );
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await quizPrefs.parse(cookieHeader)) || {};

  const url = new URL(request.url);

  const questions = cookie.questions;
  const answers = cookie.answers || {};

  if (!questions) return redirect("/");

  let quizId = url.searchParams.get("id");
  if (!quizId) {
    const lastIndex = Object.keys(answers).length;

    quizId = Object.keys(questions)[lastIndex || 0];
    url.searchParams.append("id", quizId);
    return redirect(url.href);
  }

  return json({
    questionId: quizId,
    questions: questions,
    answers: cookie.answers || {},
  });
};

const Index = () => {
  //  Reterieve loader data
  const { questionId, questions, answers } = useLoaderData<typeof loader>();
  //  Count the numbers of questions
  const questionsCount = Object.keys(questions).length;

  const answersCount = Object.keys(answers).length;

  //  Obtain the current question by questionId
  const question: Question = questions[questionId];

  //const currentAnswer = answers[questionId];

  //  Init navigator
  const navigate = useNavigate();
  //  init submit function to submit quiz
  const submit = useFetcher();
  const onSubmit = (answers: Answers) => {
    submit.submit(
      {
        action: QuizAction.cacheAnswers,
        answers: JSON.stringify(answers),
      },
      {
        method: "POST",
        action: "/quiz?index",
      }
    );
  };

  const isSubmitting =
    answersCount == questionsCount - 1 && submit.state !== "idle";
  useEffect(() => {
    if (!submit.data) return;
    //  Use init the questions belonging to the the active section
    const filteredQuestions = filterQuestions(questions, answers);
    const nextQuizId = Object.keys(filteredQuestions)[answersCount];
    //alert(JSON.stringify(answers));
    //alert(answersCount);

    navigate(`/quiz?id=${nextQuizId}`);
  }, [submit.data, questions, answers]);

  /** Saves the current quiz's answer and move to the next quiz or finish the quiz if otherwise. */
  const handleNext = (answer: string) => {
    //  If we have not the last question
    //if (answersCount < questionsCount - 1) {
    const newAnswers: Answers = {
      ...answers,
      [questionId]: answer,
    };
    onSubmit(newAnswers);
    //}
  };

  const handlePrevious = () => {
    if (answersCount > 0) {
      const newAnswers = answers.filter((_, key) => key != questionId);
      onSubmit(newAnswers);
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
          <div className=" border-b">
            <Button
              variant="text"
              className="border-e"
              onClick={() => handlePrevious()}
              disabled={answersCount === 0}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Button>
          </div>

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

          <div className="flex flex-col gap-4 fixed z-30 bottom-8 right-0 left-0">
            <Button
              variant={"fill"}
              radius={"full"}
              className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
              onClick={() => handleNext("Your answer")}
              disabled={isSubmitting || answersCount >= questionsCount - 1}
            >
              {answersCount === questionsCount - 1 ? "Finish" : "Next"}
            </Button>

            <Progress
              value={Math.min((answersCount / questionsCount) * 100, 100)}
              className="h-3 w-full rounded-none"
              indicatorColor="bg-indigo-400"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
