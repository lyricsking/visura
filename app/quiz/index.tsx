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
  const {
    quizData,
    questionsCount,
    answers,
    answersCount,
    saveAnswer,
    removeAnswer,
  } = useQuiz();
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
  useEffect(() => {
    if (
      surveyResponses.state === "idle" &&
      surveyResponses.data &&
      surveyResponses.data.success &&
      surveyResponses.data.data &&
      surveyResponses.data.data.id
    ) {
      //  Obtain the surveyResponse
      const id = surveyResponses.data.data.id;
      //  Navigate to cart
      navigate(`/order?status=cart&id=${id}`);
    }
  }, [surveyResponses, navigate]);

  /** Saves the current quiz's answer and move the index to the next quiz or finish the quiz if otherwise. */
  const handleNext = () => {
    //  If we have not already answered the last quiz.
    if (answersCount < questionsCount) {
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
      } else if (answersCount === questionsCount - 1) {
        //  We have all our answers now, we should finish the quiz now.
        //  Submit answers to `/quiz/getRecommendation` route
        surveyResponses.submit(answers, {
          method: "POST",
          action: "/quiz/getRecommendations",
          navigate: false,
        });
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
              disabled={answersCount >= questionsCount}
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
