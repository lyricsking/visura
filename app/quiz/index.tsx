import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { quizPrefs, recommendSupplements } from "./quiz.server";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Button from "~/shared/components/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import OptionsHandler from "./components/options.handler";
import { Progress } from "~/shared/components/progress";
import { useEffect } from "react";
import { Question, QuizAction } from "./quiz.type";
import { Answers, filterQuestions } from "./quiz.utils";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  
  const formData = await request.formData();
  
  const answersString = formData.get("answers");
  const supplements: Supplement[] = await recommendSupplements(JSON.parse(answersString))
  
  if(supplements){
    const cartId = await createCart(supplements);
    
    if(cartId){
      return json({ 
        success: true, 
        data: { cartId }
      });
    } else {
      return json({
        success: false,
        message: "Failed to convert supplements into order."
      })
    }
  }
};

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url);
  const {hasQuestions} = useQuiz();
  
  let questionId = url.searchParams.get("id");
  if (!questionId || !hasQuestions()) return redirect("/");
  
  return json({questionId});
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading quiz</p>;
}

export default function Index () {
  //  Retrieve loader data
  const { questionId } = useLoaderData<typeof loader>();
  
  const {answers, getQuestion, getProgress, previousQuestion, saveAnswer } = useQuiz();
  
  //  Obtain the current question by questionId
  const question: Question = getQuestion(questionId);

  //const currentAnswer = answers[questionId];
  
  const progress = getProgress();
  
  //  Init navigator
  const navigate = useNavigate();
  const gotoQuestion = (id: string) => {
    navigate(`/quiz?id=${id}`)
  }
  
  //  init submit function to submit quiz
  const quizResponse = useFetcher();
  const isSubmitting = quizResponse.state !== "idle";
  const isSubmitted = quizResponse.state === "idle" && quizResponse.data;
  
  useEffect(() => {
    if(quizResponse.data.success){
      const id = quizResponse.data.data.cartId;
      navigate(`/order?id=${id}`)
    }
  },[quizResponse, isSubmitted])
  
  /** Saves the current quiz's answer and move to the next quiz or finish the quiz if otherwise. */
  const handleNext = (answer: string) => {
    const nextQuestionId = saveAnswer(answer);
    //  We update to the recent progress after updating answers
    const progress = getProgress()
    
    if(!nextQuestionId && progress.ratio >= 1){
      quizResponse.submit({
        answers: JSON.stringify(answers())
      },{
        method: "post",
        action: "/quiz?index"
      })
    } else if(nextQuestionId) {
      gotoQuestion(nextQuestionId);
    }
  };

  const handlePrevious = () => {
    if (progress.ratio > 0) {
      const prevId = previousQuestion(questionId)
      
      gotoQuestion(prevId)
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
          <div className="border-b">
            <Button
              variant="text"
              className="border-e"
              onClick={() => handlePrevious()}
              disabled={ progress.ratio === 0}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Button>
          </div>

          <Progress
            value={progress.ratio*100}
            className="h-3 w-full rounded-none"
            indicatorColor="bg-indigo-400"
          />

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

          <div className="flex flex-col gap-4 fixed z-20 bottom-8 right-0 left-0">
            <Button
              variant={"fill"}
              radius={"full"}
              className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
              onClick={() => handleNext("Your answer")}
              disabled={ isSubmitting }
            >
              {
              isSubmitting 
              ? "Submitting" 
              : progress.currentIndex === progress.lastIndex-1
              ? "Finish" 
              : "Next"
              }
            </Button>
          </div>
        </>
      )}
    </div>
  );
}