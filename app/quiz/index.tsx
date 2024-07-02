import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useNavigate, useLoaderData, useFetcher, useSubmit, useNavigation } from "@remix-run/react";

import Button from "~/shared/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Progress } from "~/shared/components/progress";
import { commitSession, getSession } from "~/shared/utils/session";
import { questions } from "./quiz.utils";
import { getNanoid } from "~/shared/utils";
import { Question } from "./quiz.type";
import * as lo from "lodash";
import TextInputForm from "./components/InputTextForm";
import NumberInputForm from "./components/NumberInputForm";
import CheckboxGroupForm from "./components/CheckboxGroupForm";
import RadioGroupForm from "./components/RadioGroupForm";

const GID_KEY = "gId";
const GIDS_MAP_KEY = "gIdsMap";
const ANSWER_KEY = "answers";

export const action = async ({ request }: ActionFunctionArgs) => {
  //  Retrieve the submitted form quiz answers as json object
  const data = await request.json();
  console.log(data);

  const url = new URL(request.url);
  const isFinished = url.searchParams.get("finished");

  const session = await getSession(request.headers.get("Cookie"));
  session.set(ANSWER_KEY, data)
  
  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  if (isFinished) {
    return redirect("/quiz/confirm", { headers })
  }
  
  return json(
    { success: true, data: { answers: data } },
    { headers }
  );
};

export const loader = async ({params, request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  //  Converts the request url to instance of URL for easy manipulation
  const url = new URL(request.url);
  //  Obtain the current generated ID (currentId) from query string if provided or null if otherwise
  const currentId = url.searchParams.get(GID_KEY);
  
  const answers = session.get(ANSWER_KEY) || {};
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
  }

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

  const navigation = useNavigation();
  const submit = useSubmit();
  //  Listen for form submission
  const isSubmitting = navigation.state != "idle";

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

  const answer = answers[questionId]
  
  //  Total number of questions in the quiz
  const totalQuestionCount = Object.keys(gIdsMap).length;

  //  Form answer submit handler.
  const handleSubmit = (answer: number|string  | string[]) => {

    const newAnswers = lo.merge(answers, {[question.id]: answer});
    
    const nextQuestionIndex = questionIndex + 1;
    
    //  Check if we still have questions available
    if (nextQuestionIndex < totalQuestionCount) {
      //  We still have one or more question left in the quiz.
    
      const nextQuestionGId = Object.keys(gIdsMap)[nextQuestionIndex];
      //  Navigate to the next question
      submit(newAnswers, {
        action:`/quiz?index&${GID_KEY}=${nextQuestionGId}`,
        method: "POST",
        replace: true,
        encType: "application/json"
      });
    } else {
      //  We have indeed exhausted the questions available.
      submit(newAnswers, {
        action: `/quiz?index&finished=${true}`,
        method: "POST",
        replace: true,
        encType: "application/json",
      });
    }
  };

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

      <div key={question.id} className="flex-1 my-6 py-2 px-4 w-full overflow-y-auto no-scrollbar pb-32">
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