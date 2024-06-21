import { createCookie } from "@remix-run/node";

import mongoose from "mongoose";
import { dbClient } from "~/shared/utils/db.server";

import { Answers } from "./quiz";

import { Supplement, SupplementModel } from "~/app/supplements/supplements";

export interface SupplementWithScore {
  supplement: Supplement;
  score: number;
}

export const quizPrefs = createCookie("quizPrefs", {
  maxAge: 10,
});

/**
 * 
 */
export async function getOrderId(quizAnswers: Answers) {}

/**
 * Generates recommendation from quiz response.
 *
 */
export async function recommendSupplements(answers: Answers): Promise<Supplement[]> {

  const age = answers.age;
  const budgetRange = answers.budget.split(" - ").map(Number);
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

  const matchedSupplements = await SupplementModel.find(query).exec();
  
  //  Weighting mechanism to rank supplements based on how well they match the user's criteria. This ensures that the most relevant supplements are considered first
  const supplementWeights = matchedSupplements.map((supplement) => {
    let weight = 0;
    if (answers.preferences.some((pref) => supplement.preferences.includes(pref))) weight += 2;
    if (supplement.gender === answers.gender || supplement.gender === "Unisex") weight += 2;
    if (answers.healthGoals.some((goal) => supplement.healthGoals.includes(goal))) weight += 3;
    if (answers.healthConcerns.some((concern) => supplement.healthConcerns.includes(concern))) weight += 3;
    if (answers.dietaryRestrictions.some((diet) => supplement.dietaryRestrictions.includes(diet))) weight += 1;
    if (!answers.allergies.some((allergy) => supplement.allergies.includes(allergy))) weight += 1;
    if (answers.supplementForm.some((form) => form === supplement.form)) weight += 1;

    // Additional health and lifestyle factors
    if (answers.mentalHealthConcerns.some((concern) => supplement.healthConcerns.includes(concern))) weight += 2;
    if (answers.boneHealthConcerns.some((concern) => supplement.healthConcerns.includes(concern))) weight += 2;
    if (answers.chronicDiseases.some((disease) => supplement.healthConcerns.includes(disease))) weight += 2;
    
    if (supplement.benefits.includes("good-sleep") && answers.sleepQuality === "Good") weight += 1;
    if (supplement.benefits.includes("low-stress") && answers.stressLevel === "Low") weight += 1;
    if (supplement.benefits.includes("balanced-diet") && answers.dietType === "Balanced") weight += 1;
    if (supplement.benefits.includes("regular-meals") && answers.mealFrequency === "3") weight += 1;
    if (supplement.benefits.includes("well-hydrated") && answers.hydration === "5+") weight += 1;
    
    // Dietary habit factors
    if (supplement.tags.includes("smoker") && answers.smokingStatus === "No") weight += 2;
    if (supplement.tags.includes("drinker") && answers.alcoholConsumption === "Never") weight += 2;
    if (supplement.tags.includes("low-veg-consumer") && answers.vegConsumptionHabits != "Regularly") weight += 2;
    if (supplement.tags.includes("high-meat-consumer") && answers.meatConsumptionHabits !== "Never") weight += 2;
    if (supplement.tags.includes("low-fish-consumer") && answers.fishConsumptionHabits != "Regularly") weight += 2;

    return { supplement, weight };
  });

  // Sort supplements based on weight. This arranges the supplement inorder of relevance.
  supplementWeights.sort((a, b) => b.weight - a.weight);
  
  //  Initialize totalcost variable
  let totalCost = 0;
  //  Cache for supplements filter
  const recommendedSupplements: Supplement[] = [];
  //  Filter out supplement based of relevance, while ensuring totalCost is withing budget range.
  for (const { supplement } of supplementWeights) {
    if (totalCost + supplement.price <= maxBudget) {
      recommendedSupplements.push(supplement);
      totalCost += supplement.price;
    } else {
      break; // Stop adding supplements once the budget is exceeded
    }
  }

  await mongoose.connection.close();
  
  return recommendedSupplements;
}

/**
 * Converts the recommendations to order with status cart 
 * and returns order id.
 */
export async function createCart(){
  
}