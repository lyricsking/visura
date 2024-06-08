import { useCallback, useState } from "react";
import { Question, useQuiz } from "./components/quiz.provider";
import { Progress } from "~/shared/components/progress";
import HealthGoal from "./components/health.goal";

export type SectionType = {
  questions: Question[];
  questionIndex: number;
  nextCallback: (questionId: string, answer: string) => void;
  isLastQuestion: boolean;
};

const Index = () => {
  const { quizData, answers, saveAnswer, removeAnswer } = useQuiz();

  const [currentSection, setCurrentSection] =
    useState<keyof typeof quizData>("healthgoal");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const sections = Object.keys(quizData) as Array<keyof typeof quizData>;
  const sectionIndex = sections.indexOf(currentSection);
  const questions = quizData[currentSection];

  const questionsCount = Object.values(quizData).flat().length;
  const overallProgress = Object.values(answers).reduce((prev, val) => {
    return prev + Object.keys(val).length;
  }, 0);
  const progressPercent = (overallProgress / questionsCount) * 100;

  const handleNext = (questionId: string, answer: string) => {
    saveAnswer(currentSection, questionId, answer);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (sectionIndex < sections.length - 1) {
      setCurrentSection(sections[sectionIndex + 1]);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (sectionIndex === 0 && overallProgress === 0) return;
    removeAnswer(currentSection, questions[currentQuestionIndex].id);
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
      case "healthgoal":
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

  return (
    <div className="flex flex-col bg-indigo-500 border h-screen overflow-y-auto no-scrollbar">
      <Progress
        value={progressPercent}
        className="h-3 w-full border rounded-none bg-indigo-200"
        indicatorColor="bg-indigo-400"
      />

      {switchSection()}
    </div>
  );
};

export default Index;
