import { Types } from "mongoose";
import Supplement from "~/features/temp/SubscriptionBox/Product/models/supplement.model";
import {
  ISupplement,
  Gender,
} from "~/features/temp/SubscriptionBox/Product/types/supplement.type";

export const seedSupplement = async () => {
  try {
    const supplements = generateSupplementsArray(1000);

    await Supplement.deleteMany({});
    await Supplement.insertMany(supplements);
    console.log("Supplements seeded successfully");
  } catch (error) {
    console.error("Error seeding users %s", error);
  }
};

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomElements = <T>(arr: T[], minCount: number): T[] => {
  const count =
    Math.floor(Math.random() * (arr.length - minCount + 1)) + minCount;
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateRandomSupplement = (): ISupplement => {
  const genders: Gender[] = [Gender.male, Gender.female, Gender.both];
  const activities = [
    "Low",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
  ];
  const healthGoals = [
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
  ];
  const healthConcerns = [
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
  ];
  const preferences = ["Vegan", "Non-GMO", "Organic", "Herbal"];
  const dietaryRestrictions = ["Vegan", "Vegetarian", "Keto", "Paleo", "None"];
  const allergies = [
    "Nuts",
    "Soy",
    "Dairy",
    "Gluten",
    "Processed Foods",
    "None",
  ];
  const benefits = [
    "good-sleep",
    "improve-energy",
    "improve-immune",
    "anti-Inflammatory",
    "improve-bone",
    "low-stress",
    "balanced-diet",
    "improve-hydration",
  ];
  const tags = ["smoker", "drinker"];
  const forms = ["Capsule", "Powder", "Tablet", "Liquid"];

  const min = Math.floor(Math.random() * 21); // min ranges from 0 to 20 (inclusive)
  const max = min + Math.floor(Math.random() * (61 - min)); // max ranges from min to 60 (inclusive)

  return {
    _id: new Types.ObjectId(),
    name: `Supplement ${Math.floor(Math.random() * 100)}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    gender: getRandomElement(genders),
    preferences: getRandomElements(preferences, 1),
    activityLevel: getRandomElement(activities),
    healthGoals: getRandomElements(healthGoals, 1),
    healthConcerns: getRandomElements(healthConcerns, 1),
    dietaryRestrictions:
      Math.random() > 0.5
        ? getRandomElements(dietaryRestrictions, 1)
        : undefined,
    allergies:
      Math.random() > 0.5 ? getRandomElements(allergies, 1) : undefined,
    benefits: getRandomElements(benefits, 1),
    tags: getRandomElements(tags, 1),
    form: getRandomElement(forms),
    ageRange: {
      min,
      max,
    },
  };
};

export const generateSupplementsArray = (num: number): ISupplement[] => {
  return Array.from({ length: num }, generateRandomSupplement);
};
