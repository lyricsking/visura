import dotenv from "dotenv";
import { seedSupplement } from "./supplement.server";
import connectToDatabase from "../db.server";

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    await seedSupplement();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
