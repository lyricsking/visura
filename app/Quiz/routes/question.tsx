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
import { action } from "../actions/question.action";
import { loader } from "../loader/question.loader";
import { useEffect } from "react";
import { GID_KEY, ACTION_KEY } from "../utils/constants";

export { action };
export { loader };

/**
 * The Quiz page component.
 *
 * Handles the quiz page
 *
 */
export default function Question() {
  //  Retrieve the current question id
  const { answer, page, pageCount, question, uid } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const navigation = useNavigation();
  const fetcher = useFetcher();
  //  Listen for form submission
  const isSubmitting = navigation.state != "idle";

  //  Form answer submit handler.
  const handleSubmit = (answer: number | string | string[]) => {
    //  Navigate to the next question
    fetcher.submit(
      { uid, answer },
      {
        method: "POST",
        encType: "application/json",
      }
    );
  };

  useEffect(() => {
    if (!isSubmitting && fetcher.data && fetcher.data) {
      let data: any = fetcher.data;
      if (data.success) {
        if (data["uid"]) {
          navigate(`/quiz/question/${data["uid"]}`);
        } else {
          navigate("/quiz/finish");
        }
      }
    }
  }, [fetcher]);

  //  Handles moving back to previous question in quiz
  const handlePrevious = () => {
    //  Checks if we can actually move back to the previous question
    if (page > 0) {
      //  navigate(-1)
      navigate(-1);
    }
  };

  if (isSubmitting && navigation.formAction === `/quiz?${ACTION_KEY}=submit`) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  const disabled = isSubmitting || page >= pageCount;

  const submitLabel = isSubmitting
    ? "Submitting"
    : page >= pageCount - 1
    ? "Finish"
    : "Next";

  return (
    <div className="min-h-screen flex w-full py-8 bg-gray-100">
      <div className="bg-white rounded max-w-md w-full mx-auto shadow-md">
        <div className="border-b">
          <Button
            variant="text"
            size="sm"
            className="gap-2 h-12"
            onClick={() => handlePrevious()}
            disabled={page === 0}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Button>
        </div>

        <Progress
          value={Math.min((page / pageCount) * 100, 100)}
          className="h-4 w-full rounded-none bg-indigo-100"
          indicatorColor="bg-indigo-400"
        />

        <div
          key={question.id}
          className="w-full py-6 px-8 overflow-y-auto no-scrollbar pb-32"
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
    </div>
  );
}
