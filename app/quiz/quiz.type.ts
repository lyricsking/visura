export type AnswerType =
  | "text"
  | "single"
  | "multiple"
  | "tag"
  | "number"
  | "multiple-tag"
  | "single-tag";

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

export type QuestionCondition = {
  operator: Operators;
  questionId: string;
  value?: string;
};

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: AnswerType;
  options?: string[];
  condition?: QuestionCondition;
}

export interface Answers {
  name: string;
  email: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  dietaryRestrictions: string[];
  allergies: string[];
  smokingStatus: string;
  alcoholConsumption: string;
  sleepHours: number;
  sleepQuality: string;
  stressLevel: string;
  chronicDiseases: string[];
  digestiveIssues: string[];
  mentalHealthConcerns: string[];
  boneHealthConcerns: string[];
  healthGoals: string[];
  healthConcerns: string[];
  preferences: string[];
  activityLevel: string;
  exerciseHabits: string;
  currentSupplements: string[];
  medications: string[];
  mealFrequency: number;
  vegConsumptionHabits: string;
  meatConsumptionHabits: string;
  fishConsumptionHabits: string;
  dietType: string;
  hydration: number;
  sunlightExposure: number;
  livingEnvironment: string;
  supplementForm: string[];
  flavorPreferences: string[];
  budget: string;
  purchaseFrequency: string;
  brandPreferences: string[];
  sustainabilityConcerns: boolean;
  focusNeeds: boolean;
  enduranceNeeds: boolean;
}

export type Answersx = {
  [key: string]: string | string[];
};

export const QuizAction = {
  cacheQuestions: "cacheQuestions",
  cacheAnswers: "cacheAnswer",
} as const;
export type QuizAction = keyof typeof QuizAction;
