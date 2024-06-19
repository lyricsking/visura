import mongoose from "mongoose";
import { Supplement, SupplementModel, SupplementWithScore } from "./supplement";

export async function getSupplements(
  userData: Record<string, string | string[]>
): Promise<Supplement[]> {
  const query = {
    $and: [
      {
        $or: [
          { "ageRange.min": { $lte: userData.age } },
          { ageRange: { $exists: false } },
        ],
      },
      {
        $or: [
          { "ageRange.max": { $gte: userData.age } },
          { ageRange: { $exists: false } },
        ],
      },
      { $or: [{ gender: userData.gender }, { gender: { $exists: false } }] },
      {
        $or: [
          { dietaryRestrictions: { $in: userData.dietaryRestrictions } },
          { dietaryRestrictions: { $exists: false } },
        ],
      },
      {
        $or: [
          { allergies: { $nin: userData.allergies } },
          { allergies: { $exists: false } },
        ],
      },
      {
        $or: [
          { activityRecommendations: userData.activityLevel },
          { activityRecommendations: { $exists: false } },
        ],
      },
      {
        $or: [
          {
            conditions: {
              $in: [
                ...userData.chronicDiseases,
                ...userData.mentalHealthConcerns,
                ...userData.digestiveIssues,
                ...userData.boneHealthConcerns,
              ],
            },
          },
          { conditions: { $exists: false } },
        ],
      },
      {
        $or: [
          { preferredBrands: { $in: userData.brandPreferences } },
          { preferredBrands: { $exists: false } },
        ],
      },
      { $or: [{ sustainable: true }, { sustainable: { $exists: false } }] },
    ],
  };

  const supplements = await SupplementModel.find(query).exec();
  await mongoose.connection.close();
  return supplements;
}

export async function matchSupplements(
  userData: any,
  supplements: Supplement[]
): Promise<Supplement[]> {
  const matchedSupplements: SupplementWithScore[] = [];

  for (const supplement of supplements) {
    const matchHealthGoals = userData.healthGoals.some((goal: string) =>
      supplement.benefits.includes(goal)
    );
    const matchPreferences = userData.preferences.every((pref: string) =>
      supplement.tags.includes(pref)
    );
    const matchHealthConcerns = userData.healthConcerns.some(
      (concern: string) => supplement.benefits.includes(concern)
    );
    const matchActivity =
      !supplement.activityRecommendations ||
      supplement.activityRecommendations.includes(userData.activityLevel);
    const matchGender =
      !supplement.gender || supplement.gender === userData.gender;
    const matchDietaryRestrictions =
      !supplement.dietaryRestrictions ||
      supplement.dietaryRestrictions.every((dr) =>
        userData.dietaryRestrictions.includes(dr)
      );
    const matchConditions =
      !supplement.conditions ||
      supplement.conditions.every(
        (cond) =>
          userData.chronicDiseases.includes(cond) ||
          userData.mentalHealthConcerns.includes(cond) ||
          userData.digestiveIssues.includes(cond) ||
          userData.boneHealthConcerns.includes(cond)
      );
    const matchBrandPreferences =
      !supplement.preferredBrands ||
      supplement.preferredBrands.some((brand) =>
        userData.brandPreferences.includes(brand)
      );
    const matchSustainability =
      !userData.sustainabilityConcerns || supplement.sustainable;
    const matchForm =
      !userData.supplementForm.length ||
      userData.supplementForm.includes(supplement.form);
    const matchAllergies =
      !supplement.allergies ||
      !supplement.allergies.some((allergy) =>
        userData.allergies.includes(allergy)
      );

    if (
      matchHealthGoals &&
      matchPreferences &&
      matchHealthConcerns &&
      matchActivity &&
      matchGender &&
      matchDietaryRestrictions &&
      matchConditions &&
      matchBrandPreferences &&
      matchSustainability &&
      matchForm &&
      matchAllergies
    ) {
      let supplementScore = 0;

      supplementScore += userData.healthGoals.reduce(
        (score: number, goal: string) =>
          score + (supplement.benefits.includes(goal) ? 1 : 0),
        0
      );
      supplementScore += userData.healthConcerns.reduce(
        (score: number, concern: string) =>
          score + (supplement.benefits.includes(concern) ? 1 : 0),
        0
      );

      if (
        supplement.ageRange &&
        userData.age >= supplement.ageRange.min &&
        userData.age <= supplement.ageRange.max
      ) {
        supplementScore += 1;
      }
      if (
        supplement.activityRecommendations &&
        supplement.activityRecommendations.includes(userData.exerciseHabits)
      ) {
        supplementScore += 1;
      }

      matchedSupplements.push({ supplement, score: supplementScore });
    }
  }

  matchedSupplements.sort((a, b) => b.score - a.score);

  const averagePrice =
    matchedSupplements.reduce((sum, item) => sum + item.supplement.price, 0) /
    matchedSupplements.length;
  const practicalLimit = Math.max(
    1,
    Math.floor(userData.budget / averagePrice)
  );

  const allCombinations = getCombinations(matchedSupplements, practicalLimit);
  const affordableCombinations = allCombinations.filter((combination) => {
    const totalCost = combination.reduce(
      (sum, item) => sum + item.supplement.price,
      0
    );
    return totalCost <= userData.budget;
  });

  affordableCombinations.sort((a, b) => {
    const scoreA = a.reduce((sum, item) => sum + item.score, 0);
    const scoreB = b.reduce((sum, item) => sum + item.score, 0);
    return scoreB - scoreA;
  });

  return affordableCombinations.length > 0
    ? affordableCombinations[0].map((item) => item.supplement)
    : [];
}

// Function to generate combinations of supplements
export function getCombinations<T>(array: T[], maxSize: number): T[][] {
  const result: T[][] = [];

  const combine = (prefix: T[], start: number) => {
    if (prefix.length > 0) {
      result.push(prefix);
    }
    for (let i = start; i < array.length; i++) {
      combine([...prefix, array[i]], i + 1);
    }
  };

  combine([], 0);
  return result.filter((combination) => combination.length <= maxSize);
}
