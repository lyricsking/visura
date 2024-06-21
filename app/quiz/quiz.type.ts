export type AnswerType = "single" | "multiple" | "tag" | "number" | "text";

const Operators = {
  equals: "equals",
  lt: "lt",
  gt: "gt",
  lte: "lte",
  gte: "gte",
  contains: "contains",
  notNull: "notNull",
  isNull: "isNull",
} as const;
type Operators = keyof typeof Operators;

type QuestionCondition = {
  operator: Operators;
  questionId: string;
  value?: string;
};

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: AnswerType;
  options: string[];
  condition?: QuestionCondition;
}

export const QuizAction = {
  cacheQuestions: "cacheQuestions",
  cacheAnswers: "cacheAnswer",
} as const;
export type QuizAction = keyof typeof QuizAction;