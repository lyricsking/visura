import createDBConnection from "~/core/database/db.server";
import { seedOptions } from "./options.server";
import { seedPages } from "./page.server";
import { seedPlugins } from "./plugin.server";

const seedDatabase = async () => {
  try {
    await createDBConnection();

    await seedOptions();
    await seedPages();
    await seedPlugins();

    // await seedSupplement();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();