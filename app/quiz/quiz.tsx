import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useNavigate, useLoaderData, useLocation, useFetcher } from '@remix-run/react';

import { createCart, recommendSupplements } from "./quiz.server";
import type { ISupplement } from "~/supplement/supplement.type";
import { Question } from '../quiz.type';
import Button from '~/shared/components/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Progress } from '~/shared/components/progress';
import OptionsHandler from './options-handler';


export const action = async ({ request }: ActionFunctionArgs) => {
  //  Retrieve the submitted form quiz answers as formData instance
  const formData = await request.formData();
  //  Save the answer as data to send to server-side for processing
  const data = Object.fromEntries(formData.entries());
  
  
  // Handle server-side logic for form data
  
  //  
  const supplements: ISupplement[] = await recommendSupplements(
    JSON.parse(data)
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  //  Converts the request url to instance of URL for easy manipulation
  const url = new URL(request.url);
  //  Obtain the questionid from query string if provided or null if otherwise
  const questionId = url.searchParams.get("id");
  
  //  Redirect back home if there is questionId provided
  if(!questionId) return redirect("/");
  //  Return a formatted response with the questionId to the quiz component
  return json({ questionId });
};

/**
 * The Quiz page component.
 * 
 * Handles the quiz page
 * 
 */
export default function Quiz() {
  //  Retrieve the current question id
  const { questionId } = useLoaderData<typeof loader>();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const fetcher = useFetcher();
  //  Listen for form submission
  const isSubmitting = fetcher.state!="idle"
  
  //  Get the current state from location
  const initialState = location.state || {};
  //  Retrieved the stored questions
  const questions = initialState["questions"] || {};
  //  Get the question for the questionId
  const question: Question = questions[questionId];
  //  Retrieve the answer for this question if already exists
  const answer = initialState[questionId];
  
  //  Obtain the question keys
  const questionKeys = Object.keys(questions)
  //  Get the index for the id that matches the current question's id
  const questionIndex = questionKeys.findIndex((key) => key === questionId);
  //  Cache the id of the last question
  const lastQuestionId = questionKeys[questionKeys.length-1];
  
  //  Form answer submit handler, handles moving back and forth through the quiz.
  //  It checks if there are still more questions available, caches the answer in the location object for later access and move on the next question.
  //  If there are no more questions, it submits the current privided answer along with previous saved answers stored in the location state object 
  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    //  Prevents default form handler
    e.preventDefault();
    //  Retrieve formdata instance from form element
    const formData = new FormData(e.currentTarget);
    //  Prep the data
    const data = Object.fromEntries(formData.entries());
    
    //  Check if we have exhausted the questions available
    if (questionId === lastQuestionId) {
      //  We have indeed exhausted the questions available.
      
      //  Get submitted answers from state data
      const { questions, ...prevAnswers} = initialState;
      //Initialize data with previous and recently submitted data
      const answers = { ...prevAnswers, ...data };
      // Log form submission
      console.log('Final data:', data);
      // Send the data to backend here
      fetcher.submit(data, { method: "post" });
    } else {
      //  We still have one or more question left in the quiz, we find next question index and id
      const nextQuestionIndex= questionIndex + 1;
      const nextQuestionId = questionKeys[nextQuestionIndex];
      //  Navigate to the next question
      navigate(`/quiz?id=${nextQuestionId}`, {
        state: { ...initialState, ...data },
      });
    }
  };
  
  //  Handles moving back to previous question in quiz
  const handlePrevious = () => {
    const prevQuestionIndex = questionIndex - 1;
    //  Checks if we can acrullay move back to the previous question
    if(prevQuestionIndex < 0) return;
    const prevQuestionId = questionKeys[prevQuestionIndex];
    //  navigate(-1)
    navigate(`/quiz?id=${prevQuestionId}`, {
      state: initialState,
    });
  };
  
  //  Check if the form is a state of submission, then show loading screen
  if(isSubmitting) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 self-center items-center justify-center">
          Loading...
        </div>
      </div>
    )
  }
  
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
        value={Math.min((questionIndex/questionKeys.length-1)*100, 100)}
        className="h-4 w-full rounded-none"
        indicatorColor="bg-indigo-400"
      />
      
      <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
        {question.question}
      </h3>
    
      <div className="flex-1 my-6 p-2 w-full overflow-y-auto no-scrollbar pb-32">
        <fetcher.Form method="post" onSubmit={handleSubmit}>
          <OptionsHandler
            answerType={question.type}
            name={question.id}
            defaultValue={"answer"}
            onValueChange={() => {}}
            options={question.options}
          />
          
          <div className="flex fixed z-20 bottom-8 right-0 left-0">
            <Button
              variant={"fill"}
              radius={"full"}
              className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
              type='submit'
              disabled={isSubmitting || questionIndex === questionKeys.length - 1 }
            >
              {isSubmitting
                ? "Submitting"
                : questionId === lastQuestionId 
                ? "Finish"
                : "Next"}
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
