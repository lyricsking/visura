import { Gender } from "~/plugins/SubscriptionBox/Product/types/supplement.type";
import { Answers, Question, QuestionCondition } from "../types/quiz.type";
import { useNavigate } from "@remix-run/react";
import { getNanoid } from "~/utils/util";

export const questions: Question[] = [
  {
    id: "gender",
    question: "What gender are you?",
    type: "single",
    options: Object.keys(Gender),
  },
  {
    id: "age",
    question: "How old are you?",
    type: "number",
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
    id: "dietaryRestrictions",
    question: "Do you have any dietary preferences?",
    type: "multiple",
    options: ["Vegan", "Vegetarian", "Keto", "Paleo", "None"],
  },
  {
    id: "allergies",
    question: "Do you have any allergies?",
    type: "multiple",
    options: ["Nuts", "Dairy", "Gluten", "Soy", "Processed Foods", "None"],
  },
  {
    id: "mealFrequency",
    question: "How many meals do you eat per day?",
    type: "single",
    options: ["1", "2", "3", "4", "5+"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
  },
  {
    id: "dietType",
    question: "Which of these describes your diet?",
    type: "single",
    options: ["Balanced", "High-Protein", "Low-Carb", "Other"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
  },
  {
    id: "hydration",
    question: "How many cups of water do you drink on average per day?",
    type: "single",
    options: ["1", "2", "3", "4+"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
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
    id: "currentSupplements",
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
    id: "sunlightExposure",
    question: "How much time do you spend in sunlight each day (in hours)?",
    type: "single",
    options: ["1", "2", "3+"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
  },
  {
    id: "livingEnvironment",
    question: "What type of environment do you live in?",
    type: "single",
    options: ["Urban", "Suburban", "Rural"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
  },
  {
    id: "smokingStatus",
    question: "Do you smoke?",
    type: "single",
    options: ["Yes", "No"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
  },
  {
    id: "alcoholConsumption",
    question: "How often do you consume alcohol?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
    condition: {
      questionId: "gender",
      operator: "equals",
      value: "bnm",
    },
  },
  {
    id: "sleepHours",
    question: "How many hours do you sleep on average per night?",
    type: "single",
    options: ["<5", "5-7", "7-9", "9+"],
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
    id: "activityLevel",
    question: "What is your activity level?",
    type: "single",
    options: ["Low", "Lightly Active", "Moderately Active", "Very Active"],
  },
  {
    id: "exerciseHabits",
    question: "How often do you exercise?",
    type: "single",
    options: ["Never", "Occasionally", "Regularly"],
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
    id: "preferences",
    question: "Do you have any preferences for supplements?",
    type: "multiple",
    options: ["Vegan", "Organic", "Non-GMO", "Herbal"],
  },
  {
    id: "supplementForm",
    question:
      "What forms of supplements do you prefer? (Select all that apply.)",
    type: "multiple",
    options: ["Capsule", "Powder", "Tablet", "Liquid"],
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
  /*{
    id: "purchaseFrequency",
    question: "How often do you purchase supplements?",
    type: "single",
    options: ["Monthly", "Bi-Monthly", "Quarterly"],
  },*/
  {
    id: "brandPreferences",
    question: "Do you have any preferred brands? (Select all that apply.)",
    type: "multiple",
    options: ["Kedi", "Lyrics"],
  },
  /*{
    id: "sustainabilityConcerns",
    question: "Do you have any sustainability concerns for supplements?",
    type: "single",
    options: ["Yes", "No"],
  },*/
];

export function filterQuestions(answers: Answers) {
  const filteredQuestions: Question[] = [];
  questions.forEach((question) => {
    if (!question.condition) {
      filteredQuestions.push(question);
    } else {
      const condition: QuestionCondition = question.condition;
      const answer = answers[condition.questionId as keyof typeof answers];

      switch (condition.operator) {
        case "equals":
          answer == condition.value && filteredQuestions.push(question);
          break;
        case "lt":
          condition.value &&
            answer < condition.value &&
            filteredQuestions.push(question);
          break;
        case "gt":
          condition.value &&
            answer > condition.value &&
            filteredQuestions.push(question);
          break;
        case "lte":
          condition.value &&
            answer <= condition.value &&
            filteredQuestions.push(question);
          break;
        case "gte":
          condition.value &&
            answer >= condition.value &&
            filteredQuestions.push(question);
          break;
        case "contains":
          condition.value &&
            (typeof answer === "string" || Array.isArray(answer)) &&
            answer.includes(condition.value) &&
            filteredQuestions.push(question);
          break;
        case "notNull":
          answer && filteredQuestions.push(question);
          break;
        case "isNull":
          !answer && filteredQuestions.push(question);
          break;
      }
    }
  });

  return filteredQuestions;
}

export function useQuiz() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz`);
  };

  return { startQuiz };
}
