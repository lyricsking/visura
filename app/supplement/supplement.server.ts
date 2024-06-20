import mongoose from "mongoose";
import { Supplement, SupplementModel, SupplementWithScore } from "./supplement";
import mongoose, { Schema, Document, Model } from "mongoose";
import { UserData, Supplement } from "./types";

async function recommendSupplements(userData: UserData): Promise<Supplement[]> {

  const age = userData.age;
  const budgetRange = userData.budget.split(" - ").map(Number);
  const minBudget = budgetRange[0];
  const maxBudget = budgetRange[1] || Infinity;

  const query = {
    $and: [
      { preferences: { $in: userData.preferences } },
      { gender: { $in: [userData.gender, "Unisex"] } },
      { activityLevel: { $in: [userData.activityLevel, "Any"] } },
      { healthGoals: { $in: userData.healthGoals } },
      { healthConcerns: { $in: userData.healthConcerns } },
      { dietaryRestrictions: { $in: userData.dietaryRestrictions } },
      { allergies: { $nin: userData.allergies } },
      { form: { $in: userData.supplementForm } },
      { price: { $gte: minBudget, $lte: maxBudget } },
      { minAge: { $lte: age } },
      { maxAge: { $gte: age } },
    ],
  };

  const matchedSupplements = await SupplementModel.find(query).exec();
  
  //  Weighting mechanism to rank supplements based on how well they match the user's criteria. This ensures that the most relevant supplements are considered first
  const supplementWeights = matchedSupplements.map((supplement) => {
    let weight = 0;
    if (userData.preferences.some((pref) => supplement.preferences.includes(pref))) weight += 2;
    if (supplement.gender === userData.gender || supplement.gender === "Unisex") weight += 2;
    if (userData.healthGoals.some((goal) => supplement.healthGoals.includes(goal))) weight += 3;
    if (userData.healthConcerns.some((concern) => supplement.healthConcerns.includes(concern))) weight += 3;
    if (userData.dietaryRestrictions.some((diet) => supplement.dietaryRestrictions.includes(diet))) weight += 1;
    if (!userData.allergies.some((allergy) => supplement.allergies.includes(allergy))) weight += 1;
    if (userData.supplementForm.some((form) => form === supplement.form)) weight += 1;

    // Additional health and lifestyle factors
    if (userData.mentalHealthConcerns.some((concern) => supplement.healthConcerns.includes(concern))) weight += 2;
    if (userData.boneHealthConcerns.some((concern) => supplement.healthConcerns.includes(concern))) weight += 2;
    if (userData.chronicDiseases.some((disease) => supplement.healthConcerns.includes(disease))) weight += 2;
    
    if (supplement.associatedHabits.includes("non-smoker") && userData.smokingStatus === "No") weight += 1;
    if (supplement.associatedHabits.includes("non-drinker") && userData.alcoholConsumption === "Never") weight += 1;
    if (supplement.associatedHabits.includes("good-sleep") && userData.sleepQuality === "Good") weight += 1;
    if (supplement.associatedHabits.includes("low-stress") && userData.stressLevel === "Low") weight += 1;
    if (supplement.associatedHabits.includes("balanced-diet") && userData.dietType === "Balanced") weight += 1;
    if (supplement.associatedHabits.includes("regular-meals") && userData.mealFrequency === "3") weight += 1;
    if (supplement.associatedHabits.includes("well-hydrated") && userData.hydration === "5+") weight += 1;
    
    // Dietary habit factors
    if (supplement.associatedHabits.includes("high-veg-consumption") && userData.vegConsumptionHabits === "Regularly") weight += 1;
    if (supplement.associatedHabits.includes("low-meat-consumption") && userData.meatConsumptionHabits === "Never") weight += 1;
    if (supplement.associatedHabits.includes("high-fish-consumption") && userData.fishConsumptionHabits === "Regularly") weight += 1;

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
