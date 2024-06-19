import { useSubmit } from "@remix-run/react";
import { getNanoid } from "~/shared/utils";

export type AnswerType = "single" | "multiple" | "tag";

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

export interface Answers {
  [key: string]: string | string[];
}

export const QuizAction = {
  cacheQuestions: "cacheQuestions",
  cacheAnswers: "cacheAnswer",
} as const;
export type QuizAction = keyof typeof QuizAction;

const questions: Question[] = [
  {
    id: "healthGoal",
    question: "What are your health goal? (Select all that apply)",
    type: "single",
    options: [
      "Weight Loss",
      "Muscle Gain",
      "Improve Energy",
      "General Wellness",
      "Improve Digestion",
      "Better Sleep",
      "Stress Reduction",
      "Increased Flexibility",
      "Cardiovascular health",
      "Immune improvement",
      "Mood & emotional wellness",
      "Body detoxification",
      "Skin health",
      "Improve Sexual health",
      "Hormone balance",
    ],
  },
  {
    id: "dietaryPreference",
    question: "Do you follow any specific dietary preferences?",
    type: "single",
    options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"],
  },
  {
    id: "foodAvoidances",
    question: "Are there any foods you need to avoid? (Select all that apply)",
    type: "multiple",
    options: ["Dairy", "Soy", "Nuts", "Processed Foods"],
  },
  {
    id: "exerciseFrequency",
    question: "How often do you exercise?",
    type: "single",
    options: ["Daily", "3-5 times a week", "1-2 times a week", "Rarely"],
  },
  {
    id: "sleepHours",
    question: "How many hours do you usually sleep each night?",
    type: "single",
    options: [
      "Less than 5 hours",
      "5-7 hours",
      "7-9 hours",
      "More than 9 hours",
    ],
  },
  {
    id: "healthConcerns",
    question: "Do you have any health concerns? (Select all that apply)",
    type: "multiple",
    options: [
      "Joint pain",
      "Digestive issues",
      "Immune deficiency",
      "Blood Pressure",
      "Fatigue",
      "Cholesterol",
      "Diabetes",
      "Inflammation",
      "Hypertension",
      "Allergies",
      "Anxiety",
      "Stress",
      "Sleep disorders",
      "Depression",
      "Osteoporosis",
      "Skin condition",
      "Eye",
      "Liver",
      "Menopause",
      "Menstrual",
    ],
  },
];

export function useQuiz() {
  const submit = useSubmit();

  const questionsWithId: { [key: string]: Question } = {};

  questions.forEach((question) => {
    const id = getNanoid(21);
    questionsWithId[id] = question;
  });

  const startQuiz = () =>
    submit(
      {
        action: QuizAction["cacheQuestions"],
        questions: JSON.stringify(questionsWithId),
      },
      {
        method: "post",
        action: "/quiz?index",
      }
    );

  return {
    startQuiz,
  };
}

export function filterQuestions(
  questions: Record<string, Question>,
  answers: Answers
) {
  const questionsKeys = Object.keys(questions);
  const filteredQuestions: Record<string, Question> = {};

  questionsKeys.forEach((key) => {
    const question = questions[key];
    if (!question.condition) {
      filteredQuestions[key] = question;
      return;
    } else {
      const condition: QuestionCondition = question.condition;
      const answer = answers[condition.questionId];
      switch (condition.operator) {
        case "equals":
          answer == condition.value && (filteredQuestions[key] = question);
          break;
        case "lt":
          condition.value &&
            answer < condition.value &&
            (filteredQuestions[key] = question);
          break;
        case "gt":
          condition.value &&
            answer > condition.value &&
            (filteredQuestions[key] = question);
          break;
        case "lte":
          condition.value &&
            answer <= condition.value &&
            (filteredQuestions[key] = question);
          break;
        case "gte":
          condition.value &&
            answer >= condition.value &&
            (filteredQuestions[key] = question);
          break;
        case "contains":
          condition.value &&
            answer.includes(condition.value) &&
            (filteredQuestions[key] = question);
          break;
        case "notNull":
          answer && (filteredQuestions[key] = question);
          break;
        case "isNull":
          !answer && (filteredQuestions[key] = question);
          break;
      }
    }
  });

  return filteredQuestions;
}
// types.ts

export interface UserData {
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
  dietType: string;
  hydration: number;
  sunlightExposure: number;
  livingEnvironment: string;
  supplementForm: string[];
  flavorPreferences: string[];
  budget: number;
  purchaseFrequency: string;
  brandPreferences: string[];
  sustainabilityConcerns: boolean;
  focusNeeds: boolean;
  enduranceNeeds: boolean;
}
