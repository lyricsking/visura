import { connectToDatabase, disconnectDatabase } from "./db.server.ts";

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    await seedUsers();
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await disconnectDatabase()
  }
};

seedDatabase();
