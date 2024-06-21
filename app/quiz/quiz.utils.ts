import { useSubmit } from "@remix-run/react";
import { getNanoid } from "~/shared/utils";
import { Question, QuestionCondition, QuizAction } from "./quiz.type";

const questions: Question[] = [
  {
    id: "name",
    question: "Tell us your name",
    type: "text",
    options: [],
  },
  {
    id: "email",
    question: "What is your email address?",
    type: "text",
    options: [],
  },
  {
    id: "age",
    question: "What is your age?",
    type: "number",
    options: [],
  },
  {
    id: "gender",
    question: "What is your gender?",
    type: "single",
    options: ["Male", "Female", "Other"],
  },
  {
    id: "dietaryRestrictions",
    question: "Do you have any dietary preferences?",
    type: "multiple",
    options: ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo", "None"],
  },
  {
    id: "allergies",
    question: "Do you have any allergies?",
    type: "multiple",
    options: ["Nuts", "Dairy", "Gluten", "Soy", "Processed Foods", "None"],
  },
  {
    id: "smokingStatus",
    question: "Do you smoke?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "alcoholConsumption",
    question: "How often do you consume alcohol?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
  },
  {
    id: "sleepHours",
    question: "How many hours do you sleep on average per night?",
    type: "single",
    options: [
      "Less than 5 hours",
      "5-7 hours",
      "7-9 hours",
      "More than 9 hours",
    ],
  },
  {
    id: "sleepQuality",
    question: "How would you rate the quality of your sleep?",
    type: "single",
    options: ["Poor", "Average", "Good"],
  },
  {
    id: "stressLevel",
    question: "How would you rate your stress level?",
    type: "single",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "chronicDiseases",
    question: "Do you have any chronic diseases?",
    type: "multiple",
    options: ["Diabetes", "Hypertension", "Heart Disease", "None"],
  },
  {
    id: "digestiveIssues",
    question: "Do you have any digestive issues?",
    type: "multiple",
    options: ["Acid Reflux", "IBS", "Constipation", "None"],
  },
  {
    id: "mentalHealthConcerns",
    question: "Do you have any mental health concerns?",
    type: "multiple",
    options: ["Anxiety", "Depression", "None"],
  },
  {
    id: "boneHealthConcerns",
    question: "Do you have any bone health concerns?",
    type: "multiple",
    options: ["Osteoporosis", "Arthritis", "None"],
  },
  {
    id: "healthGoals",
    question: "What are your health goals? (Select all that apply)",
    type: "multiple",
    options: [
      "Weight Loss",
      "Muscle Gain",
      "Energy Boost",
      "General Wellness",
      "Improve Digestion",
      "Better Sleep",
      "Stress Reduction",
      "Increased Flexibility",
      "Cardiovascular Health",
      "Immune Improvement",
      "Mood & Emotional Wellness",
      "Body Detoxification",
      "Skin Health",
      "Improve Sexual Health",
      "Hormone Balance",
    ],
  },
  {
    id: "healthConcerns",
    question: "Do you have any health concerns? (Select all that apply)",
    type: "multiple",
    options: [
      "Joint Pain",
      "Digestive Issues",
      "Immune Deficiency",
      "Blood Pressure",
      "Fatigue",
      "Cholesterol",
      "Diabetes",
      "Inflammation",
      "Hypertension",
      "Allergies",
      "Anxiety",
      "Stress",
      "Sleep Disorders",
      "Depression",
      "Osteoporosis",
      "Skin Condition",
      "Eye Issues",
      "Liver Issues",
      "Menopause",
      "Menstrual Issues",
    ],
  },
  {
    id: "preferences",
    question: "Do you have any preferences for supplements?",
    type: "multiple",
    options: ["Vegan", "Organic", "Non-GMO", "Herbal"],
  },
  {
    id: "activityLevel",
    question: "What is your activity level?",
    type: "single",
    options: [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
    ],
  },
  {
    id: "exerciseHabits",
    question: "How often do you exercise?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
  },
  {
    id: "fishConsumptionHabits",
    question: "How often do you consume fish?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
  },
  {
    id: "meatConsumptionHabits",
    question: "How often do you consume meat?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
  },
  {
    id: "vegConsumptionHabits",
    question: "How often do you consume vegetables?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
  },
  {
    id: "currentVitaminSupplements",
    question: "Are you currently taking any supplements?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "medications",
    question: "Are you currently taking any medications?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "mealFrequency",
    question: "How many meals do you eat per day?",
    type: "single",
    options: ["1", "2", "3", "4", "5+"],
  },
  {
    id: "dietType",
    question: "What type of diet do you follow?",
    type: "single",
    options: ["Balanced", "High-Protein", "Low-Carb", "Other"],
  },
  {
    id: "hydration",
    question: "How many cups of water do you drink on average per day?",
    type: "single",
    options: ["1", "2", "3", "4+"],
  },
  {
    id: "sunlightExposure",
    question: "How much time do you spend in sunlight each day (in hours)?",
    type: "single",
    options: ["1", "2", "3+"],
  },
  {
    id: "livingEnvironment",
    question: "What type of environment do you live in?",
    type: "single",
    options: ["Urban", "Suburban", "Rural"],
  },
  {
    id: "supplementForm",
    question:
      "What forms of supplements do you prefer? (Select all that apply.)",
    type: "multiple",
    options: ["Capsule", "Powder", "Liquid"],
  },
  {
    id: "flavorPreferences",
    question: "Do you have any flavor preferences for supplements?",
    type: "text",
    options: [],
  },
  {
    id: "budget",
    question: "What is your monthly budget for supplements?",
    type: "single",
    options: [
      "0 - 10,000",
      "10,000 - 25,000",
      "25,000 - 50,000",
      "50,000 - 100,000",
      "100,000+",
    ],
  },
  {
    id: "purchaseFrequency",
    question: "How often do you purchase supplements?",
    type: "single",
    options: ["Monthly", "Bi-Monthly", "Quarterly"],
  },
  {
    id: "brandPreferences",
    question: "Do you have any preferred brands? (Select all that apply.)",
    type: "multiple",
    options: ["Kedi"],
  },
  {
    id: "sustainabilityConcerns",
    question: "Do you have any sustainability concerns for supplements?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "focusNeeds",
    question: "Do you need supplements to help with focus?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "enduranceNeeds",
    question: "Do you need supplements to help with endurance?",
    type: "single",
    options: ["Yes", "No"],
  },
];

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
        action: QuizAction.cacheQuestions,
        questions: JSON.stringify(questionsWithId),
      },
      {
        method: "post",
        action: "/quiz?index",
      }
    );

  return { startQuiz };
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
      const answer = answers[condition.questionId as keyof typeof answers];

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
            (typeof answer === "string" || Array.isArray(answer)) &&
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
