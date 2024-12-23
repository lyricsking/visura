import { useFetcher, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import Button from "~/shared/components/button";
import { action } from "../actions/quiz.action";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";

export { action };

export default function Quiz() {
  const fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (!isSubmitting && fetcher.data) {
      let data: any = fetcher.data;
      if (data["uid"]) {
        navigate(`/quiz/question/${data["uid"]}`, {
          replace: true,
        });
      }
    }
  }, [fetcher]);

  return (
    <main className="flex flex-col max-h-screen w-full md:max-w-lg bg-white md:my-6 mx-auto py-8 px-6 md:rounded-md md:shadow-md">
      <h2 className="text-4xl font-bold text-center mb-6 px-6">
        Health and Wellness Supplement Quiz
      </h2>
      <p className="text-lg text-start mt-8 px-6">
        Take the health and wellness supplement quiz to help you quickly decide
        on what is best for your health.
      </p>
      <p className="text-lg text-start mt-8 px-6">
        By participating in this quiz, you agree that your responses will be
        recorded and used to process the quiz results.
      </p>

      <div className="flex flex-col flex-grow" />

      <fetcher.Form
        method="post"
        className="w-full flex flex-col px-6 mt-auto mx-auto"
      >
        <Button
          variant="fill"
          type="submit"
          disabled={isSubmitting}
          className=" bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Start Quiz
        </Button>
      </fetcher.Form>
    </main>
  );
}
