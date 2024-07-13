import dotenv from "dotenv";
import { connectToDatabase, disconnectDatabase } from "../db.server";
import { seedSupplement } from "./supplement.server";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    await seedSupplement();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await disconnectDatabase();
  }
};

seedDatabase();
