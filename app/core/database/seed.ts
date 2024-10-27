import connectToDatabase from "./db.server";
import { seedOptions } from "./seeds/options.server";
import { seedPages } from "./seeds/page.server";

const seedDatabase = async () => {
  try {
    await connectToDatabase();

    await seedOptions();
    await seedPages();

    // await seedSupplement();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
