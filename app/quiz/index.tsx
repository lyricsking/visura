import { useEffect, useState } from "react";
import {
  Question,
  Question as QuestionType,
  useQuiz,
} from "./components/quiz.provider";
import { Progress } from "~/shared/components/progress";
import { QuizDataKey } from "./layout";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import Button from "~/shared/components/button";
import OptionsHandler from "./components/options.handler";
import { useNavigate } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const action = ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await quizPrefs.parse(cookieHeader)) || {};
  
  const formData = await request.formData();

  const action = formData.get("action")
  if(action === QuizAction.cacheQuestions) {
    const questions = formData.get("questions");
    
    return json({ questions }, {
      headers: {
        "Set-Cookie": await quizPrefs.serialize(cookie),
      },
    });
  } else if(action=== QuizAction.cacheAnswers){
   
    const answers = formData.get("answers");
  
    cookie.answers = answers;

    return json({ success: true }, {
      headers: {
        "Set-Cookie": await quizPrefs.serialize(cookie),
      },
    });
  }
}

const loader = ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await quizPrefs.parse(cookieHeader)) || {};
  
  return json({ 
    questions:  cookie.questions,
    answers: cookie.answers, 
  });
}

const Index = () => {
  //  Reterieve loader data
  const {questions, answers } = useLoaderData<typeof loader>();
  //  Use init the questions belonging to the the active section
  const filteredQuestions = filterQuestions(questions,answers);
  //  Count the numbers of questions
  const questionsCount = filteredQuestions.length;
  
  const answersCount = answers.length;
   // Since answersCount will share same index with the last answered question, we pick the next quiz question by the (index + 1) which same as answersCount.
  const questionId = Object.keys(questions)[answersCount]
  
  //  Obtain the current question by questionId
  const question: Question = questions[questionId];
 
  //const currentAnswer = answers[questionId];
  
  //  Init navigator
  const navigation = useNavigation();
  //  init submit function to submit quiz
  const submit = useSubmit();
  const onSubmit = (answers: any)=>{
    submit({
      action: QuizAction.cacheAnswers,
      answers
    }, 
    {
      method: "POST",
      action: "/quiz?index",
    });
  }
  
  const isSubmitting = navigation.state !== "idle";
  
  /** Saves the current quiz's answer and move to the next quiz or finish the quiz if otherwise. */
  const handleNext = (answer: any) => {
    //  If we have not the last question
    if (answersCount < questionsCount-1) {
      const newAnswers = {
        ...answers, 
        questionId: answer
      }
      onSubmit(newAnswers);
    }
  };

  const handlePrevious = () => {
    if(answersCount >0){
      const newAnswers = answers.filter((_, key)=> key != questionId);
      onSubmit(newAnswers);
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
          <div className=" border-b">
            <Button
              variant="text"
              className="gap-2 py-6 px-2 border-e rounded-none"
              onClick={() => handlePrevious()}
              disabled={answersCount === 0}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Button>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
            {question.question}
          </h3>

          <div className="flex-1 my-6 p-2 w-full">
            <OptionsHandler
              answerType={question.type}
              currentAnswer={answer}
              onAnswerSelected={setAnswer}
              options={question.options}
            />
          </div>

          <div className="flex flex-col gap-4 fixed z-30 bottom-8 right-0 left-0">
            <Button
              variant={"fill"}
              radius={"full"}
              className="h-12 w-2/3 mx-auto text-xl text-white text-center bg-indigo-400"
              onClick={handleNext}
              disabled={isSubmitting || answersCount <= questionsCount}
            >
              {answersCount === questionsCount - 1 ? "Finish" : "Next"}
            </Button>

            <Progress
              value={Math.min((answersCount / questionsCount) * 100, 100)}
              className="h-3 w-full rounded-none"
              indicatorColor="bg-indigo-400"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
