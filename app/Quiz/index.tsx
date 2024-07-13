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

import Button from "~/shared/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Progress } from "~/shared/components/progress";
import { commitSession, getSession, USER_SESSION_KEY } from "~/shared/utils/session";
import { filterQuestions, questions } from "./quiz.utils";
import { getNanoid } from "~/shared/utils";
import { Question } from "./quiz.type";
import * as lo from "lodash";
import TextInputForm from "./components/InputTextForm";
import NumberInputForm from "./components/NumberInputForm";
import CheckboxGroupForm from "./components/CheckboxGroupForm";
import RadioGroupForm from "./components/RadioGroupForm";
import { ISupplementModel } from "~/supplement/supplement.model";
import { createCart, recommendSupplements } from "./quiz.server";
import Loading from "~/shared/components/loading";

export const GIDS_MAP_KEY = "gIdsMap";
export const ANSWER_KEY = "answers";

const GID_KEY = "gId";
const ACTION_KEY = "_action";

export const action = async ({ request }: ActionFunctionArgs) => {
  //  Converts the request url to instance of URL for easy manipulation
  const url = new URL(request.url);
  //  Retrieve the submitted form quiz answers as json object
  const answers = await request.json();
  console.log(answers);

  const session = await getSession(request.headers.get("Cookie"));

  if (
    answers &&
    url.searchParams.has(ACTION_KEY) &&
    url.searchParams.get(ACTION_KEY) === "submit"
  ) {
    try {
      const supplements: ISupplementModel[] = await recommendSupplements(
        answers
      );

      if (Array.isArray(supplements) && supplements.length > 0) {
        const params = {
          name: answers["name"],
          email: answers["email"],
          supplements,
        };
        
        await createCart(params);
        //  Cache user data in session if not logged in
        session.set(USER_SESSION_KEY, {
          name: params.name,
          email: params.email
        })
        //  Remove quiz session data, as we no longer need it.
        //session.unset(GIDS_MAP_KEY);
        //session.unset(ANSWER_KEY);

        const headers = {
          "Set-Cookie": await commitSession(session),
        };

        return json({ success: true, data: { answers } }, { headers });
      }
    } catch (error) {
      console.log(error);

      return json({ success: false, data: { answers } });
    }
  }

  session.set(ANSWER_KEY, answers);

  const headers = {
    "Set-Cookie": await commitSession(session),
  };

  return json({ success: true, data: { answers } }, { headers });
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  //  Converts the request url to instance of URL for easy manipulation
  const url = new URL(request.url);
  //  Obtain the current generated ID (currentId) from query string if provided or null if otherwise
  const currentId = url.searchParams.get(GID_KEY);
  const _action = url.searchParams.get(ACTION_KEY);

  if (_action && _action === "submit") {
    return redirect("/cart");
  }

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

  //  Redirects if the unique Id is not provided or invalid i.e maybe session expired
  const gIds = Object.keys(gIdsMap);
  if (!currentId || !gIds.includes(currentId)) {
    const gId = gIds[0];
    return redirect(`/quiz?${GID_KEY}=${gId}`, { headers });
  }

  //  Get the questionId keyed by currentId
  const questionId = gIdsMap[currentId];
  const answers = session.get(ANSWER_KEY) || {};

  //  Return a formatted response with the questionId, question uid to id map and answers, to the quiz component
  return json({ questionId, gIdsMap, answers }, { headers });
};

/**
 * The Quiz page component.
 *
 * Handles the quiz page
 *
 */
export default function Quiz() {
  //  Retrieve the current question id
  const { questionId, gIdsMap, answers } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const navigation = useNavigation();
  const submit = useSubmit();
  //  Listen for form submission
  const isSubmitting = navigation.state != "idle";

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

  const answer = answers[questionId];

  //  Total number of questions in the quiz
  const totalQuestionCount = Object.keys(gIdsMap).length;

  //  Form answer submit handler.
  const handleSubmit = (answer: number | string | string[]) => {
    const newAnswers = lo.merge(answers, { [question.id]: answer });

    const nextQuestionIndex = questionIndex + 1;

    //  Prepare next question
    const filteredQuestions = filterQuestions(answers);
    //  Check if we still have questions available
    if (nextQuestionIndex < filteredQuestions.length) {
      //  We still have one or more question left in the quiz.
      const nextQuestionGId = Object.keys(gIdsMap).find(
        (uid) => gIdsMap[uid] === filteredQuestions[nextQuestionIndex].id
      );
      //  Navigate to the next question
      submit(newAnswers, {
        action: `/quiz?index&${GID_KEY}=${nextQuestionGId}`,
        method: "POST",
        replace: true,
        encType: "application/json",
      });
    } else {
      //  We have indeed exhausted the questions available.
      submit(newAnswers, {
        action: `/quiz?index&${ACTION_KEY}=submit`,
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

  if (
    isSubmitting &&
    navigation.formAction === `/quiz?index&${ACTION_KEY}=submit`
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
