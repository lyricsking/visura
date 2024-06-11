import { useEffect, useState } from "react";
import {
  Question,
  Question as QuestionType,
  useQuiz,
} from "./components/quiz.provider";
import { Progress } from "~/shared/components/progress";
import { QuizDataKey } from "./layout";
import QuestionHandler from "./components/question";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import Button from "~/shared/components/button";
import OptionsHandler from "./components/question";

export type SectionType = {
  questions: QuestionType[];
  questionIndex: number;
  nextCallback: (questionId: string, answer: string) => void;
  isLastQuestion: boolean;
};

const Index = () => {
  const { quizData, saveAnswer, removeAnswer, progress } = useQuiz();

  const [currentSection, setCurrentSection] =
    useState<QuizDataKey>("healthGoal");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = quizData[currentSection];
  const question: Question = questions[currentQuestionIndex];

  const sections = Object.keys(quizData) as Array<QuizDataKey>;
  const sectionIndex = sections.indexOf(currentSection);

  const handleNext = (answer: any) => {
    saveAnswer(currentSection, questions[currentQuestionIndex].id, answer);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (sectionIndex < sections.length - 1) {
      setCurrentSection(sections[sectionIndex + 1]);
      setCurrentQuestionIndex(0);
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

  const isLastQuestion =
    currentQuestionIndex < questions.length - 1
      ? false
      : sectionIndex < sections.length - 1
      ? false
      : true;

  return (
    <div className="flex flex-col h-screen">
      <Progress
        value={progress}
        className="h-3 w-full border-2 rounded-none bg-indigo-200"
        indicatorColor="bg-indigo-400"
      />

      <div className=" border-b">
        <Button
          variant="text"
          className="py-4 px-6 border-e rounded-none"
          onClick={() => handlePrevious()}
          disabled={sectionIndex === 0 && progress === 0}
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
            <OptionsHandler />
          </div>

          <Button
            variant={"fill"}
            radius={"full"}
            className="fixed z-40 bottom-6 h-12 w-2/3 text-xl text-white text-center bg-indigo-400"
            onClick={() => {}}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
