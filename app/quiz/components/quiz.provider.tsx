import React, { createContext, useContext, useState } from "react";

export type AnswerType = "single" | "multiple";

export interface Question {
  id: string;
  question: string;
  type: AnswerType;
  options: string[];
}

export interface QuizData {
  [key: string]: Question[];
  //section1: Question[];
  //section2: Question[];
  //section3: Question[];
}

export interface Answers {
  [key: string]: {
    [key: number]: string;
  };
}

interface Progress {
  [key: string]: number;
}

interface QuizContextType {
  quizData: QuizData;
  answers: Answers;
  saveAnswer: (section: string, questionId: number, answer: string) => void;
  removeAnswer: (section: string, questionId: number) => void;
  progress: Progress;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

type QuizProviderType = {
  quizData: QuizData;
  children: React.ReactNode;
};
export function QuizProvider({ children, quizData }: QuizProviderType) {
  const [answers, setAnswers] = useState<Answers>({});
  const [progress, setProgress] = useState<Progress>({
    section1: 0,
    section2: 0,
    section3: 0,
  });

  const saveAnswer = (section: string, questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: answer,
      },
    }));

    setProgress((prev) => ({
      ...prev,
      [section]: Math.min(prev[section] + 1, quizData[section].length),
    }));
  };

  const removeAnswer = (section: string, questionId: number) => {
    setAnswers((prev) => {
      const newSectionAnswers = { ...prev[section] };
      delete newSectionAnswers[questionId];
      return {
        ...prev,
        [section]: newSectionAnswers,
      };
    });

    setProgress((prev) => ({
      ...prev,
      [section]: Math.max(prev[section] - 1, 0),
    }));
  };

  return (
    <QuizContext.Provider
      value={{ quizData, answers, saveAnswer, removeAnswer, progress }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
