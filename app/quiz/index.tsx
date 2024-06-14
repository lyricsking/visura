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

/**
 * Describes the section information
 *
 */
export type SectionType = {
  questions: QuestionType[];
  questionIndex: number;
  nextCallback: (questionId: string, answer: string) => void;
  isLastQuestion: boolean;
};

const Index = () => {
  //  context provider data hook for quiz data and info
  const { quizData, questionsCount, answers, answersCount, saveAnswer, removeAnswer } = useQuiz();
  //  Get sections' name from key indices
  const sections = Object.keys(quizData) as Array<QuizDataKey>;
  //  uses react's state to store current section
  const [currentSection, setCurrentSection] =
    useState<QuizDataKey>("healthGoal");
    //  We obtain the current section's index from sections name array
  const sectionIndex = sections.indexOf(currentSection);
  //  Use react's state to store and update current section's quiz index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //  Use init the questions belonging to the the active section
  const questions = quizData[currentSection];
  //  Obtain the question for the currentQuestionIndex
  const question: Question = questions[currentQuestionIndex];
  
  //  Uses react's state to store and manage provided answer for the active quiz question
  const [answer, setAnswer] = useState();
  //  Retrieve the current provided answer for 
  //  the active quiz question, listens and update new answer
  useEffect(() => {
    const currentAnswer = answers[currentSection]
      ? answers[currentSection][question.id]
      : null;
    setAnswer(currentAnswer);
  }, [currentSection, answers, question]);
  //  Init navigate hook to navigate to cart after recommendations is generated
  const navigate = useNavigate();
  //  init submit function to submit quiz
  const surveyResponses = useFetcher();
  const isSubmitting = surveyResponses.state !== "idle";
  //  Listen for when post request is completed, then navigate to cart.
  useEffect(()=>{
    if(surveyResponses.state === "idle" && surveyResponses.data.success&& surveyResponses.data.data&&surveyResponses.data.data.id){
      //  Obtain the surveyResponse
      const id = surveyResponses.data.data.id;
      //  Navigate to cart
      navigate(`/order?status=cart&id=${id}`)
    }
  },[surveyResponses])
  
  /** Saves the current quiz's answer and move the index to the next quiz or finish the quiz if otherwise. */
  const handleNext = () => {
    //  If we have not already answered the last quiz.
    if(answersCount < questionsCount){
      // We have not answered the last quiz yet, we then save the given answer to state
      saveAnswer(currentSection, questions[currentQuestionIndex].id, answer);
      //  Decide where ae are currently in the quiz and waht to do next.
      if (currentQuestionIndex < questions.length - 1) {
        //  There is still more quiz in this section, move the current index to the next quiz
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (sectionIndex < sections.length - 1) {
        //  We have answer to the last quiz in this section, we should proceed to the next section
        setCurrentSection(sections[sectionIndex + 1]);
        setCurrentQuestionIndex(0);
      }else if(answersCount === questionsCount-1){
        //  We have all our answers now, we should finish the quiz now.
        //  Submit answers to `/quiz/getRecommendation` route 
        surveyResponses.submit(answers, {
          method: "POST",
          action: "/quiz/getRecommendations",
          navigate: false,
        })
      }
    }
  };

  const handlePrevious = () => {
    removeAnswer(currentSection, questions[currentQuestionIndex].id);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (sectionIndex > 0) {
      const prevSection = sections[sectionIndex - 1];
      const prevQuestions = quizData[prevSection];
      //removeAnswer(prevSection, prevQuestions[prevQuestions.length - 1].id);
      setCurrentSection(prevSection);
      setCurrentQuestionIndex(prevQuestions.length - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
    { isSubmitting
      ? (<div className="align-self-center">
        Loading...
      </div>) 
      :
      (<>
      <Progress
        value={Math.min((answersCount / questionsCount) * 100, 100)}
        className="h-3 w-full border rounded-none bg-indigo-200"
        indicatorColor="bg-indigo-400"
      />

      <div className=" border-b">
        <Button
          variant="text"
          className="py-4 px-6 border-e rounded-none"
          onClick={() => handlePrevious()}
          disabled={answersCount === 0}
        >
          <ArrowLongLeftIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1">
        <div className="flex flex-col items-center justify-center h-full py-8 px-6">
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
        </div>

        <Button
          variant={"fill"}
          radius={"full"}
          className="fixed z-40 bottom-6 h-12 w-2/3 text-xl text-white text-center bg-indigo-400"
          onClick={handleNext}
          disabled={answersCount>= questionsCount}
        >
          {answersCount === questionsCount-1 ? "Finish" : "Next"}
        </Button>
      </div>
      </>)
    }
    </div>
  );
};

export default Index;
