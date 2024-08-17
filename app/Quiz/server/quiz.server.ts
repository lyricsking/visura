import { Session, createCookie } from "@remix-run/node";

import { Gender, type ISupplement } from "~/Supplement/supplement.type";
import { Answers, Question } from "../types/quiz.type";
import { findSupplement } from "~/Supplement/supplement.server";
import { addItemsToCart, deleteCart } from "~/Order/server/cart.server";
import { IItem } from "~/Order/types/order.type";
import { getNanoid } from "~/utils";
import { QIDS_MAP_KEY, ANSWER_KEY, QUESTION_KEY } from "../utils/constants";
import { questions, filterQuestions } from "../utils/quiz.utils";

export const quizPrefs = createCookie("quizPrefs", {
  maxAge: 1440,
});

export function initQuiz(session: Session) {
  let qIdsMap: Record<string, string> = {};
  questions.forEach((question) => {
    const id = getNanoid(32);
    qIdsMap[id] = question.id;
  });

  //  Save generate id map to session
  session.set(QIDS_MAP_KEY, qIdsMap);
  // Reset the answers
  session.unset(ANSWER_KEY);

  return Object.keys(qIdsMap)[0];
}

export async function saveQuizAnswer(
  session: Session,
  uid: string,
  answer: number | string | string[]
): Promise<string | number | undefined> {
  let qUIdMap: Record<string, string> = session.get(QIDS_MAP_KEY);

  const qUIds = Object.keys(qUIdMap);
  if (!uid || !qUIds.includes(uid)) {
    return;
  }

  let answers = await session.get(ANSWER_KEY);

  answers = {
    ...answers,
    [qUIdMap[uid]]: answer,
  };

  session.set(ANSWER_KEY, answers);

  //  Let try to find the next question uid
  let filteredQuestions = filterQuestions(answers);
  const nextQuestionIndex =
    filteredQuestions.findIndex((question) => question.id === qUIdMap[uid]) + 1;
  const nextQuestion = filteredQuestions[nextQuestionIndex];
  if (nextQuestionIndex >= filteredQuestions.length || !nextQuestion) {
    return -1;
  }

  return Object.keys(qUIdMap).find((key) => qUIdMap[key] === nextQuestion.id);
}

type GetQuestion = {
  question: Question;
  uid: string;
  page: number;
  pageCount: number;
  answer?: boolean | number | string | string[];
};
export async function getQuestion(
  session: Session,
  uid: string
): Promise<GetQuestion | void> {
  let qUIdMap = await session.get(QIDS_MAP_KEY);

  let answers: Answers = (await session.get(ANSWER_KEY)) || {};

  let qUIds: string[] = Object.keys(qUIdMap || []);
  if (!uid || !qUIds.includes(uid)) {
    return;
  }

  //  Find the question by qId
  let questions = filterQuestions(answers);
  let qId = qUIdMap[uid];
  //  The id value mapped to the uid
  let qIndex = 0;
  let question = questions.find((question, index) => {
    const isVal = question.id === qId;
    if (isVal) {
      qIndex = index;
    }

    return isVal;
  });

  return {
    question: question!,
    answer: answers?.[question!.id as keyof Answers],
    uid: uid,
    page: qIndex,
    pageCount: questions.length,
  };
}

export function getAnswers(session: Session) {
  return session.get(ANSWER_KEY);
}

interface SupplementWithScore {
  supplement: ISupplement;
  weight: number; //  Calculated weight based on relevance to user's selections
}

type CreateCartType = {
  name: string;
  email: string;
  supplements: ISupplement[];
};

/**
 * Converts the recommendations to order with status cart
 * and returns order id.
 *
 * @param supplements
 */
export async function createCart({
  name,
  email,
  supplements,
}: CreateCartType): Promise<void> {
  const items: IItem[] = supplements.map((supplement) => {
    const quantity = 1;

    return {
      productId: supplement._id,
      name: supplement.name,
      quantity: quantity,
      price: supplement.price,
      total: supplement.price * quantity,
      purchaseMode: "monthly",
    };
  });

  await deleteCart(email);

  return addItemsToCart(name, email, items);
}

/**
 * Generates recommendation from quiz response.
 *
 */
export async function recommendSupplements(
  answers: Answers
): Promise<ISupplement[]> {
  const age = Number(answers.age);

  const budget = answers["budget"];
  let budgetRange = [];
  if (budget.includes("+")) {
    budgetRange = [
      parseFloat(budget.replace(",", "").replace("+", "")),
      Infinity,
    ];
  } else {
    budgetRange = budget
      .split(" - ")
      .map((value) => parseFloat(value.replace(",", "")));
  }
  const minBudget = budgetRange[0];
  const maxBudget = budgetRange[1] || Infinity;

  const query = {
    $and: [
      { preferences: { $in: answers.preferences } },
      { gender: { $in: [answers.gender, Gender.both] } },
      { activityLevel: { $in: [answers.activityLevel, "Any"] } },
      { healthGoals: { $in: answers.healthGoals } },
      { healthConcerns: { $in: answers.healthConcerns } },
      { dietaryRestrictions: { $in: answers.dietaryRestrictions } },
      { allergies: { $nin: answers.allergies } },
      { form: { $in: answers.supplementForm } },
      { price: { $lte: maxBudget } },
      { "ageRange.min": { $lte: age } },
      { "ageRange.max": { $gte: age } },
    ],
  };

  //  Get supplement
  const matchedSupplements = await findSupplement(query);

  //  Weighting mechanism to rank supplements based on how well they match the user's criteria. This ensures that the most relevant supplements are considered first
  const supplementWeights: SupplementWithScore[] = matchedSupplements.map(
    (supplement: any) => {
      let weight = 0;
      if (
        answers.preferences.some((pref: string) =>
          supplement.preferences.includes(pref)
        )
      )
        weight += 2;
      if (supplement.gender === answers.gender || supplement.gender === "both")
        weight += 2;
      if (
        answers.healthGoals.some((goal: string) =>
          supplement.healthGoals.includes(goal)
        )
      )
        weight += 3;
      if (
        answers.healthConcerns.some((concern: string) =>
          supplement.healthConcerns.includes(concern)
        )
      )
        weight += 3;
      if (
        answers.dietaryRestrictions.some((diet: string) =>
          supplement.dietaryRestrictions?.includes(diet)
        )
      )
        weight += 1;
      if (
        !answers.allergies.some((allergy: string) =>
          supplement.allergies?.includes(allergy)
        )
      )
        weight += 1;
      if (
        answers.supplementForm.some((form: string) => form === supplement.form)
      )
        weight += 1;

      // Additional health and lifestyle factors
      if (
        answers.mentalHealthConcerns.some((concern: string) =>
          supplement.healthConcerns.includes(concern)
        )
      )
        weight += 2;
      if (
        answers.boneHealthConcerns.some((concern: string) =>
          supplement.healthConcerns.includes(concern)
        )
      )
        weight += 2;
      if (
        answers.chronicDiseases.some((disease: string) =>
          supplement.healthConcerns.includes(disease)
        )
      )
        weight += 2;

      if (
        supplement.benefits.includes("good-sleep") &&
        answers.sleepQuality === "Good"
      )
        weight += 1;
      if (
        supplement.benefits.includes("low-stress") &&
        answers.stressLevel === "Low"
      )
        weight += 1;
      if (
        supplement.benefits.includes("balanced-diet") &&
        answers.dietType === "Balanced"
      )
        weight += 1;
      if (
        supplement.benefits.includes("regular-meals") &&
        answers.mealFrequency === 3
      )
        weight += 1;
      if (
        supplement.benefits.includes("improve-hydration") &&
        answers.hydration <= 5
      )
        weight += 1;

      // Dietary habit factors
      if (supplement.tags.includes("smoker") && answers.smokingStatus === "No")
        weight += 2;
      if (
        supplement.tags.includes("drinker") &&
        answers.alcoholConsumption === "Never"
      )
        weight += 2;
      if (
        supplement.tags.includes("low-veg-consumer") &&
        answers.vegConsumptionHabits != "Regularly"
      )
        weight += 2;
      if (
        supplement.tags.includes("high-meat-consumer") &&
        answers.meatConsumptionHabits !== "Never"
      )
        weight += 2;
      if (
        supplement.tags.includes("low-fish-consumer") &&
        answers.fishConsumptionHabits != "Regularly"
      )
        weight += 2;

      return { supplement, weight };
    }
  );

  // Sort supplements based on weight. This arranges the supplement inorder of relevance.
  supplementWeights.sort((a, b) => b.weight - a.weight);

  //  Initialize totalCost variable, holds the total cost of supplements
  let totalCost = 0;
  //  Cache for supplements filter
  const recommendedSupplements: ISupplement[] = [];
  //  Filter out supplement based of relevance, while ensuring totalCost is withing budget range.
  for (const { supplement } of supplementWeights) {
    if (totalCost + supplement.price <= maxBudget) {
      recommendedSupplements.push(supplement);
      totalCost += supplement.price;
    } else {
      break; // Stop adding supplements once the budget is exceeded
    }
  }

  return recommendedSupplements;
}
