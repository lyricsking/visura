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

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  //  Retrieve the submitted form quiz answers as formData instance
  const formData = await request.formData();
  //  Save the answer as data to send to server-side for processing
  const data = Object.fromEntries(formData.entries());

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
  console.log("Highde", currentId);
  const session = await getSession(request.headers.get("Cookie"));

  // Generate a map of unique IDs for questions if not already generated
  let gIdsMap = session.get(GIDS_MAP_KEY);
  console.log("session", gIdsMap);
  if (!gIdsMap) {
    gIdsMap = {};

    questions.forEach((question) => {
      const id = getNanoid(32);
      gIdsMap[id] = question.id;
    });

    session.set(GIDS_MAP_KEY, gIdsMap);
  }
  
  console.log("generated", gIdsMap);

  const answers = session.get(ANSWER_KEY) || {};

  //  Redirect to the first question if provided question id no longer exist, e.g maybe session expired
  const gIds = Object.keys(gIdsMap);
  if (!currentId || !gIds.includes(currentId)) {
    const gId = gIds[0];
    return redirect(`/quiz?${GID_KEY}=${gId}`);
    //return null;
  }
  //  Return a formatted response with the currentId to the quiz component
  return json(
    { currentId, gIdsMap, answers },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
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
  const question: Question | undefined = questions.find((question, index) => {
    const bool = question.id === questionId;
    //  While we are at it, let get it Index as well
    if (bool) {
      questionIndex = index;
    }
    return bool;
  });

  //  Total number of questions in the quiz
  const totalQuestionCount = gIdsMap.length;

  //  Form answer submit handler, handles moving back and forth through the quiz.
  //  It checks if there are still more questions available, caches the answer in the location object for later access and move on the next question.
  //  If there are no more questions, it submits the current privided answer along with previous saved answers stored in the location state object
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    //  Prevents default form handler
    e.preventDefault();
    //  Retrieve formdata instance from form element
    const formData = new FormData(e.currentTarget);
    //  Prep the data
    const data = Object.fromEntries(formData.entries());
    // Log form submission
    console.log("Form data:", data);

    const newAnswers = lo.merge(answers, data);
    // Log form submission
    console.log("Final data:", newAnswers);

    // Send the data to backend here
    fetcher.submit(newAnswers);
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
    if (fetcher.data) {
      const nextQuestionIndex = questionIndex + 1;
      //  Check if we have exhausted the questions available
      if (nextQuestionIndex < totalQuestionCount) {
        //  We still have one or more question left in the quiz.

        const nextQuestionGId = Object.keys(gIdsMap)[nextQuestionIndex];
        //  Navigate to the next question
        navigate(`/quiz?gId=${nextQuestionGId}`);
      } else {
        //  We have indeed exhausted the questions available.
        navigate(`/quiz/confirmation`, {
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

      <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
        {question?.question}
      </h3>

      <div className="flex-1 my-6 p-2 w-full overflow-y-auto no-scrollbar pb-32">
        <fetcher.Form method="post" onSubmit={handleSubmit}>
          <OptionsHandler
            answerType={question!.type}
            name={question!.id}
            defaultValue={"answer"}
            onValueChange={() => {}}
            options={question!.options}
          />

          <div className="flex fixed z-20 bottom-8 right-0 left-0">
            <Button
              variant={"fill"}
              radius={"full"}
              className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
              type="submit"
              disabled={
                isSubmitting || questionIndex + 1 === totalQuestionCount
              }
            >
              {isSubmitting
                ? "Submitting"
                : questionIndex + 1 === totalQuestionCount
                ? "Finish"
                : "Next"}
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
