import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useNavigate, useLoaderData, useFetcher } from "@remix-run/react";

import Button from "~/shared/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Progress } from "~/shared/components/progress";
import { useEffect } from "react";
import { commitSession, getSession } from "~/shared/utils/session";
import { questions } from "./quiz.utils";
import { getNanoid } from "~/shared/utils";
import { Question } from "./quiz.type";
import * as lo from "lodash";
import OptionsHandler from "./components/options-handler";
import { Label } from "~/shared/components/label";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  console.log("servers");
  //  Retrieve the submitted form quiz answers as formData instance
  const formData = await request.formData();
  //  Save the answer as data to send to server-side for processing
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  session.set(ANSWER_KEY, data);

  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  return json({ success: true, data: { answers: data } }, { headers });
};

const GID_KEY = "gId";
const GIDS_MAP_KEY = "gIdsMap";
const ANSWER_KEY = "answers";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  //  Converts the request url to instance of URL for easy manipulation
  const url = new URL(request.url);
  //  Obtain the current generated ID (currentId) from query string if provided or null if otherwise
  const currentId = url.searchParams.get(GID_KEY);
  const session = await getSession(request.headers.get("Cookie"));

  // Generate a map of unique IDs for questions if not already generated
  let gIdsMap = session.get(GIDS_MAP_KEY);
  if (!gIdsMap) {
    gIdsMap = {};

    questions.forEach((question) => {
      const id = getNanoid(32);
      gIdsMap[id] = question.id;
    });

    session.set(GIDS_MAP_KEY, gIdsMap);
  }

  //  Set header session
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
  //  Redirect to the first question if question id is not set or provided question id no longer exist, e.g maybe session expired
  const gIds = Object.keys(gIdsMap);
  if (!currentId || !gIds.includes(currentId)) {
    const gId = gIds[0];
    return redirect(`/quiz?${GID_KEY}=${gId}`, { headers });
    //return null;
  }

  const answers = session.get(ANSWER_KEY) || {};
  //  Return a formatted response with the currentId to the quiz component
  return json({ currentId, gIdsMap, answers }, { headers });
};

/**
 * The Quiz page component.
 *
 * Handles the quiz page
 *
 */
export default function Quiz() {
  //  Retrieve the current question id
  const { currentId, gIdsMap, answers } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const fetcher = useFetcher();
  //  Listen for form submission
  const isSubmitting = fetcher.state != "idle";

  //  Get the questionId keyed by currentId
  const questionId = gIdsMap[currentId];
  //
  let questionIndex = 0;
  const question: Question = questions.find((question, index) => {
    const bool = question.id === questionId;
    //  While we are at it, let get it Index as well
    if (bool) {
      questionIndex = index;
    }
    return bool;
  });

  //  Total number of questions in the quiz
  const totalQuestionCount = Object.keys(gIdsMap).length;

  //  Form answer submit handler.
  const handleSubmit = (answer: string  | string[]) => {
    const newAnswers = lo.merge(answers, {[question.id]: answer});
    // Send the data to backend here
    fetcher.submit(newAnswers, { method: "POST" });
  };

  //  Handles moving back to previous question in quiz
  const handlePrevious = () => {
    const prevQuestionIndex = questionIndex - 1;
    //  Checks if we can actually move back to the previous question
    if (prevQuestionIndex >= 0) {
      const prevQuestionId = Object.keys(gIdsMap)[prevQuestionIndex];
      //  navigate(-1)
      navigate(`/quiz?gId=${prevQuestionId}`);
    }
  };

  useEffect(() => {
    if (fetcher.state == "loading" && fetcher.data) {
      const nextQuestionIndex = questionIndex + 1;

      //  Check if we have exhausted the questions available
      if (nextQuestionIndex < totalQuestionCount) {
        //  We still have one or more question left in the quiz.

        const nextQuestionGId = Object.keys(gIdsMap)[nextQuestionIndex];
        //  Navigate to the next question
        navigate(`/quiz?${GID_KEY}=${nextQuestionGId}`);
      } else {
        //  We have indeed exhausted the questions available.
        navigate(`/quiz/confirm`, {
          state: (fetcher.data as any).data,
        });
      }
    }
  }, [
    fetcher.state,
    fetcher.data,
    questionIndex,
    totalQuestionCount,
    gIdsMap,
    navigate,
  ]);
  
  const disabled = isSubmitting || questionIndex >= totalQuestionCount;
  
  const submitLabel = isSubmitting 
    ? "Submitting" 
    : questionIndex === totalQuestionCount - 1
    ? "Finish"
    : "Next";
    
  return (
    <div className="flex flex-col max-h-screen">
      <div className="border-b">
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
        className="h-4 w-full rounded-none"
        indicatorColor="bg-indigo-400"
      />

      <div className="flex-1 my-6 p-2 w-full overflow-y-auto no-scrollbar pb-32">
        {
          question.type === "text"
          ? <TextInputForm />
          : questions.type=== "number"
          ? <NumberInputForm
              disabled={disabled}
              label={question.question}
              name={question.id}
              onsubmit={handleSubmit}
              submitLabel={submitLabel}
              value={answers[question.id]}
            />
          : question.type === "multiple"
          ? <CheckboxGroupForm />
          : <RadioGroupForm />
        }
      </div>
    </div>
  );
}