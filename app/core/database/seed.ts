import connectToDatabase from "./db";
import { seedOptions } from "./seeds/options.server";
import { seedPages } from "./seeds/page.server";
import { seedPlugins } from "./seeds/plugin.server";

const seedDatabase = async () => {
  try {
    await connectToDatabase();

    await seedOptions();
    await seedPages();
    await seedPlugins();

    // await seedSupplement();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
