import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  useNavigate,
  useLoaderData,
  useFetcher,
  useSubmit,
  useNavigation,
  Link,
} from "@remix-run/react";

import Button from "~/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Progress } from "~/components/progress";
import { commitSession, getSession, USER_SESSION_KEY } from "~/utils/session";
import { getNanoid } from "~/utils";
import * as lo from "lodash";
import TextInputForm from "../components/InputTextForm";
import NumberInputForm from "../components/NumberInputForm";
import CheckboxGroupForm from "../components/CheckboxGroupForm";
import RadioGroupForm from "../components/RadioGroupForm";
import { createCart, recommendSupplements } from "../server/quiz.server";
import Loading from "~/components/loading";
import { ISupplement } from "~/Supplement/supplement.type";
import { filterQuestions, questions } from "../utils/quiz.utils";
import { Question } from "../types/quiz.type";
import { setUnauthUser } from "~/Auth/server/auth.server";

const GID_KEY = "gId";
const ACTION_KEY = "_action";
const START_ACTION_KEY="startQuiz";

export {action}
export {loader};

/**
 * The Quiz page component.
 *
 * Handles the quiz page
 *
 */
export default function Quiz() {
  //  Retrieve the current question id
  const { question, uid } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const navigation = useNavigation();
  const fetcher = useFetcher();
  //  Listen for form submission
  const isSubmitting = navigation.state != "idle";

  const answer = answers[questionId];

  //  Total number of questions in the quiz
  const totalQuestionCount = Object.keys(gIdsMap).length;

  //  Form answer submit handler.
  const handleSubmit = (answer: number | string | string[]) => {
    //  Navigate to the next question
    fetcher.submit({ uid, answer }, {
      method: "POST",
      replace: true,
      encType: "application/json",
    });
  };
  
  useEffect(() => {
    if(!isSubmitting && fetcher.data && fetcher.data) {
      let data = fetcher.data;
      if (data["uid"]) {
        navigate(`/quiz/question/${data["uid"]}`, {
          replace: true,
        })
      }
    }
  },[fetcher])
  
  //  Handles moving back to previous question in quiz
  const handlePrevious = () => {
    const prevQuestionIndex = questionIndex - 1;
    //  Checks if we can actually move back to the previous question
    if (prevQuestionIndex >= 0) {
      const prevQuestionId = Object.keys(gIdsMap)[prevQuestionIndex];
      //  navigate(-1)
      navigate(`/quiz?${GID_KEY}=${prevQuestionId}`, {});
    }
  };

  if (
    isSubmitting &&
    navigation.formAction === `/quiz?${ACTION_KEY}=submit`
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  const disabled = isSubmitting || questionIndex >= totalQuestionCount;

  const submitLabel = isSubmitting
    ? "Submitting"
    : questionIndex === totalQuestionCount - 1
    ? "Finish"
    : "Next";

  return (
    <div className="flex flex-col max-h-screen">
      <div className="flex-none border-b">
        <Button
          variant="text"
          size="sm"
          className="border-e gap-2 h-12"
          onClick={() => handlePrevious()}
          disabled={questionIndex === 0}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </Button>
      </div>

      <Progress
        value={Math.min((questionIndex / totalQuestionCount) * 100, 100)}
        className="flex-none h-4 w-full rounded-none bg-indigo-100"
        indicatorColor="bg-indigo-400"
      />

      <div
        key={question.id}
        className="flex-1 py-6 px-4 w-full overflow-y-auto no-scrollbar pb-32"
      >
        {question.type === "text" ? (
          <TextInputForm
            disabled={disabled}
            id={question.id}
            label={question.question}
            name={question.id}
            onsubmit={handleSubmit}
            submitLabel={submitLabel}
            value={answer}
          />
        ) : question.type === "number" ? (
          <NumberInputForm
            disabled={disabled}
            id={question.id}
            label={question.question}
            name={question.id}
            onsubmit={handleSubmit}
            submitLabel={submitLabel}
            value={answer}
          />
        ) : question.type === "multiple" ? (
          <CheckboxGroupForm
            disabled={disabled}
            id={question.id}
            label={question.question}
            name={question.id}
            onsubmit={handleSubmit}
            submitLabel={submitLabel}
            options={question.options!}
            selections={answer}
          />
        ) : (
          <RadioGroupForm
            disabled={disabled}
            id={question.id}
            label={question.question}
            name={question.id}
            onsubmit={handleSubmit}
            submitLabel={submitLabel}
            options={question.options!}
            value={answer}
          />
        )}
      </div>
    </div>
  );
}
