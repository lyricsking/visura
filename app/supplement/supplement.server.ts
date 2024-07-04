export async function getSupplements() {}
import {
  connectToDatabase,
  disconnectDatabase,
} from "~/shared/database/db.server.js";
import type { ISupplement, ISupplementModel } from "./supplement.model";
import Supplement from "./supplement.model";
import { Gender } from "./supplement.type";

export const findSupplement = async (
  query: Record<string, any>
): Promise<ISupplementModel[]> => {
  try {
    await connectToDatabase();

    return await Supplement.find(query).exec();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await disconnectDatabase();
  }
};

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomElements = <T>(arr: T[], minCount: number): T[] => {
  const count = Math.floor(Math.random() * (arr.length - minCount + 1)) + minCount;
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateRandomSupplement = (): ISupplement => {
  const genders: Gender[] = [Gender.male, Gender.female, Gender.both];
  const activities = ["Low", "Moderate", "High"];
  const healthGoals = ["Weight Loss", "Muscle Gain", "Endurance", "General Health"];
  const healthConcerns = ["Heart Health", "Diabetes", "Joint Pain", "Fatigue"];
  const preferences = ["Vegan", "Gluten-Free", "Non-GMO", "Organic"];
  const dietaryRestrictions = ["Vegetarian", "Keto", "Paleo", "Dairy-Free", "None"];
  const allergies = ["Peanuts", "Soy", "Gluten", "Shellfish", "None"];
  const benefits = ["Energy Boost", "Immune Support", "Anti-Inflammatory", "Bone Health"];
  const tags = ["Fitness", "Health", "Wellness", "Supplement"];
  const forms = ["Capsule", "Powder", "Tablet", "Liquid"];

  return {
    name: `Supplement ${Math.floor(Math.random() * 100)}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    gender: getRandomElement(genders),
    preferences: getRandomElements(preferences, 1),
    activityLevel: getRandomElement(activities),
    healthGoals: getRandomElements(healthGoals, 1),
    healthConcerns: getRandomElements(healthConcerns, 1),
    dietaryRestrictions: Math.random() > 0.5 ? getRandomElements(dietaryRestrictions, 1) : undefined,
    allergies: Math.random() > 0.5 ? getRandomElements(allergies, 1) : undefined,
    benefits: getRandomElements(benefits, 1),
    tags: getRandomElements(tags, 1),
    form: getRandomElement(forms),
    ageRange: { min: Math.floor(Math.random() * 20) + 20, max: Math.floor(Math.random() * 20) + 40 },
  };
};

export const generateSupplementsArray = (num: number): ISupplement[] => {
  return Array.from({ length: num }, generateRandomSupplement);
};