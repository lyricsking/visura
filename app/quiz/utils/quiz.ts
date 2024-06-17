export type AnswerType = "single" | "multiple" | "tag";

const Operators = {
  equals: "equals",
  lt: "lt",
  gt: "gt",
  lte: "lte",
  gte: "gte",
  contains: "contains",
  notNull: "notNull",
  isNull: "isNull"
} as const
type Operators = keyof typeof Operators;

type QuestionCondition = {
  operator: Operators,
  questionId: string,
  value?: string,
}

export interface Question {
  id: string;
  question: string;
  description?: string,
  type: AnswerType
  options: string[];
  condition?: QuestionCondition
}

export interface Answers {
  [key: string]: any;
}

export const QuizAction = {
  cacheQuestions: "cacheQuestions",
  cacheAnswers: "cacheAnswer"
} as const
export type QuizAction = keyof typeof QuizAction

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
      "Hormone balance"
      ],
    },
    {
    id: "dietaryPreference",
    question: "Do you follow any specific dietary preferences?",
    type: "single",
    options: [
      "None", 
      "Vegetarian", 
      "Vegan", 
      "Gluten-Free", 
      "Keto", 
      "Paleo"
    ],
    },
    {
    id: "foodAvoidances",
    question: "Are there any foods you need to avoid? (Select all that apply)",
    type: "multiple",
    options: [
      "Dairy", 
      "Soy", 
      "Nuts", 
      "Processed Foods"
    ],
    },
    {
    id: "exerciseFrequency",
    question: "How often do you exercise?",
    type: "single",
    options: [
      "Daily", 
      "3-5 times a week", 
      "1-2 times a week", "Rarely"
    ],
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
      "Menstrual"
    ],
    }
  ];

export function useQuiz(): Record<string, Question> {
  const submit = useSubmit();

  let questionsWithId = {};

  questions.forEach((question) => {
    const id = getNanoid(15);
    questionsWithId[id] = question;
  })

  const startQuiz = ()=>submit({
    action: QuizAction["cacheQuestions"],
    questions: questionsWithId
  }, {
    method: "post",
    action: "/quiz?index"
  });
  
  return { startQuiz }
}

export function filterQuestions(questionsObj: Record<string, Question>, answers: Answers){
  const questions = Object.values(questionsObj);
  
  const filteredQuestions:Record<string, Question> = {};
  
  questions.filter((question) => {
    return !question.condition;
    
    const condition: QuestionCondition = question.condition;
    const answer = answers[condition.questionId];
    switch (condition.operator) {
      case 'equals':
        return answer == condition.value;
      case 'lt':
        return answer < condition.value;
      case 'gt':
        return answer > condition.value;
      case 'lte':
        return answer <= condition.value;
      case 'gte':
        return answer >= condition.value;
      case 'contains':
        return answer.includes(condition.value);
      case 'notNull':
        return answer;
      case 'isNull':
        return !answer;
    }
  })
}