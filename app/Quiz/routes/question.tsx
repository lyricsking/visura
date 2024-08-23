import { useNavigate, useLoaderData, useFetcher } from "@remix-run/react";

import Button from "~/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Progress } from "~/components/progress";
import TextInputForm from "../components/InputTextForm";
import NumberInputForm from "../components/NumberInputForm";
import CheckboxGroupForm from "../components/CheckboxGroupForm";
import RadioGroupForm from "../components/RadioGroupForm";
import Loading from "~/components/loading";
import { action } from "../actions/question.action";
import { loader } from "../loader/question.loader";
import { useEffect } from "react";
import { ACTION_KEY } from "../utils/constants";

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

  const { user } = useContextData();

  const navigate = useNavigate();

  const fetcher = useFetcher();
  //  Listen for form submission
  const isSubmitting = fetcher.state != "idle";

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
    // Form is currently idle and has data, i.e a form has been submitted
    // and value returned
    if (!isSubmitting && fetcher.data) {
      // Retrieve the data
      let data: any = fetcher.data;
      // Check if the data is a success
      if (data.success === true) {
        // If it is, navigate to the next question
        if (data["uid"]) {
          navigate(`/quiz/question/${data["uid"]}`);
        } else if (data["cart"]) {
          // If it is, and it is a cart, navigate to the cart
          navigate("/cart");
        } else if (user) {
          // If it is, and it is a user, submit form
          fetcher.submit(
            {
              firstname: user.profile.firstName,
              lastname: user.profile.lastName,
              email: user.email,
              subscribe: user.profile.preferences.notifications.orderUpdates,
            },
            { method: "POST" }
          );
        } else {
          // Otherwise, navigate to the finish page
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

  if (isSubmitting && fetcher.formAction === `/quiz/finish`) {
    return (
      <div className="flex flex-col max-h-screen w-full md:max-w-lg bg-white md:my-6 mx-auto md:rounded-md md:shadow-md">
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
    <main className="flex flex-col w-full md:max-w-md bg-white md:my-6 mx-auto md:rounded-md md:shadow-md">
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
        className="flex-none h-4 w-full rounded-none bg-indigo-100"
        indicatorColor="bg-indigo-400"
      />

      <div
        key={question.id}
        className="w-full py-6 px-8 overflow-y-auto no-scrollbar"
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
    </main>
  );
}
function useContextData(): { user: any } {
  throw new Error("Function not implemented.");
}
