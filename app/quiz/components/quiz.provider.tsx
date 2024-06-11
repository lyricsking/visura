import React, { createContext, useContext, useEffect, useState } from "react";

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
    [key: number]: any;
  };
}

interface QuizContextType {
  quizData: QuizData;
  answers: Answers;
  saveAnswer: (section: string, questionId: number, answer: any) => void;
  removeAnswer: (section: string, questionId: number) => void;
  questionsCount: number;
  answersCount: number
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

type QuizProviderType = {
  quizData: QuizData;
  children: React.ReactNode;
};
export function QuizProvider({ children, quizData }: QuizProviderType) {
  const [answers, setAnswers] = useState<Answers>({});

  const saveAnswer = (section: string, questionId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: answer,
      },
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
  };

  const questionsCount = Object.values(quizData).flat().length;
  
  const answersCount = Object.values(answers).reduce((prev, val) => {
      return prev + Object.keys(val).length;
    }, 0);
    
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
