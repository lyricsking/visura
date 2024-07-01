import Supplement from "~/supplement/supplement.model";
import type { ISupplement } from "~/supplement/supplement.type";

const supplements: ISupplement[] = [
  {
    name: "yyy",
    price: 0, 
    gender: "both",
    preferences: [""],
    activityLevel: "string",
    healthGoals: [""],
    healthConcerns: [""],
    dietaryRestrictions: [""],
    allergies: [""],
    benefits: [""],
    tags: [""],
    form: "string",
    ageRange: {
      min: 0,
      max: 0,
    }
  }
];

export const seedSupplement = async () => {
  try {
    await Supplement.deleteMany({});
    const x = await Supplement.insertMany(supplements);
    console.log('Supplements seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
