export async function getSupplements() {}
import { connectToDatabase, disconnectDatabase } from "~/shared/utils/db.server.js";
import Supplement from "./supplement.type"
import type { ISupplement } from './supplement.type';

const supplements: Omit<ISupplement, "_id">[] = [
  {
    name: "",
    price: 0, 
    gender: "other",
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
    await Supplement.insertMany;
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export const findSupplement = async (query: Record<string, any>): Promise<ISupplement[] > => {
  try {
    await connectToDatabase()
    
    return await Supplement.find(query).exec();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await disconnectDatabase()
  }
}