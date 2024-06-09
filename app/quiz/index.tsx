import { useCallback, useState } from "react";
import { Question as QuestionType, useQuiz } from "./components/quiz.provider";
import { Progress } from "~/shared/components/progress";
import { QuizDataKey } from "./layout";
import HealthGoal from "./components/health.goal";
import QuestionHandler from "./components/question";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import Button from "~/shared/components/button";

export type SectionType = {
  questions: QuestionType[];
  questionIndex: number;
  nextCallback: (questionId: string, answer: string) => void;
  isLastQuestion: boolean;
};

const Index = () => {
  const { quizData, answers, saveAnswer, removeAnswer } = useQuiz();

  const [currentSection, setCurrentSection] =
    useState<QuizDataKey>("healthGoal");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const sections = Object.keys(quizData) as Array<QuizDataKey>;
  const sectionIndex = sections.indexOf(currentSection);
  const questions = quizData[currentSection];

  const questionsCount = Object.values(quizData).flat().length;
  const overallProgress = Object.values(answers).reduce((prev, val) => {
    return prev + Object.keys(val).length;
  }, 0);
  const progressPercent = (overallProgress / questionsCount) * 100;

  const handleNext = (answer: string) => {
    saveAnswer(currentSection, questions[currentQuestionIndex].id, answer);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (sectionIndex < sections.length - 1) {
      setCurrentSection(sections[sectionIndex + 1]);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    removeAnswer(currentSection, questions[currentQuestionIndex - 1].id);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (sectionIndex > 0) {
      setCurrentSection(sections[sectionIndex - 1]);
      setCurrentQuestionIndex(quizData[sections[sectionIndex - 1]].length - 1);
    }
  };

  const switchSection = useCallback(() => {
    const isLastQuestion =
      currentQuestionIndex < questions.length - 1
        ? false
        : sectionIndex < sections.length - 1
        ? false
        : true;

    switch (currentSection) {
      case "healthGoal":
        return (
          <HealthGoal
            questions={questions}
            questionIndex={currentQuestionIndex}
            isLastQuestion={isLastQuestion}
            nextCallback={handleNext}
          />
        );
    }
  }, [currentSection, currentQuestionIndex]);

  const isLastQuestion =
    currentQuestionIndex < questions.length - 1
      ? false
      : sectionIndex < sections.length - 1
      ? false
      : true;

  return (
    <div className="flex flex-col h-screen">
      <Progress
        value={progressPercent}
        className="h-3 w-full border-2 rounded-none bg-indigo-200"
        indicatorColor="bg-indigo-400"
      />

      <div className=" border-b">
        <Button
          variant="text"
          className="py-4 px-6 border-e rounded-none"
          onClick={() => handlePrevious()}
          disabled={sectionIndex === 0 && overallProgress === 0}
        >
          <ArrowLongLeftIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1">
        <QuestionHandler
          question={questions[currentQuestionIndex]}
          isLastQuestion={isLastQuestion}
          onSave={handleNext}
        />
      </div>
    </div>
  );
};

export default Index;
