import { createCookie } from "@remix-run/node";

import mongoose from "mongoose";
import type {  ISupplement} from "~/supplement/supplement.type";
import { addItemsToCart } from "~/cart/cart.server";
import type { IItem } from "~/dashboard/order/order.type";
import { Answers } from "./quiz.type";
import { findSupplement } from "~/supplement/supplement.server";
import type { ISupplementModel } from "~/supplement/supplement.model";

interface SupplementWithScore {
  supplement: ISupplementModel;
  weight: number; //  Calculated weight based on relevance to user's selections
}

export const quizPrefs = createCookie("quizPrefs", {
  maxAge: 1440,
});

/**
 * Converts the recommendations to order with status cart
 * and returns order id.
 *
 * @param supplements
 */
export async function createCart(supplements: ISupplementModel[]): Promise<void> {
  const items: IItem[] = supplements.map((supplement) => ({
    productId: supplement.id,
    name: supplement.name,
    quantity: 1,
    price: supplement.price,
    total: supplement.price * 1,
  }));

  return addItemsToCart(new mongoose.Types.ObjectId(""), items);
}

/**
 * Generates recommendation from quiz response.
 *
 */
export async function recommendSupplements(
  answers: Answers
): Promise<ISupplementModel[]> {
  // Todo D3mo quickly return supplements
  return generateSupplementsArray(10);
  
  const age = answers.age;
  const budgetRange = (answers["budget"] as string).split(" - ").map(Number);
  const minBudget = budgetRange[0];
  const maxBudget = budgetRange[1] || Infinity;

  const query = {
    $and: [
      { preferences: { $in: answers.preferences } },
      { gender: { $in: [answers.gender, "Unisex"] } },
      { activityLevel: { $in: [answers.activityLevel, "Any"] } },
      { healthGoals: { $in: answers.healthGoals } },
      { healthConcerns: { $in: answers.healthConcerns } },
      { dietaryRestrictions: { $in: answers.dietaryRestrictions } },
      { allergies: { $nin: answers.allergies } },
      { form: { $in: answers.supplementForm } },
      { price: { $gte: minBudget, $lte: maxBudget } },
      { minAge: { $lte: age } },
      { maxAge: { $gte: age } },
    ],
  };
  
  //  Get supplement
  const matchedSupplements = await findSupplement(query)
  
  //  Weighting mechanism to rank supplements based on how well they match the user's criteria. This ensures that the most relevant supplements are considered first
  const supplementWeights: SupplementWithScore[] = matchedSupplements.map(
    (supplement: ISupplementModel) => {
      let weight = 0;
      if (
        answers.preferences.some((pref: string) =>
          supplement.preferences.includes(pref)
        )
      )
        weight += 2;
      if (
        supplement.gender === answers.gender ||
        supplement.gender === "both"
      )
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
        supplement.benefits.includes("well-hydrated") &&
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
  const recommendedSupplements: ISupplementModel[] = [];
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
