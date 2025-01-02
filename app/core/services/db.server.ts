import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function createDBConnection() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error(
      "Please define the DATABASE_URL environment variable inside .env"
    );
  }

  if (!mongoose.connection.readyState) {
    await mongoose.connect(DATABASE_URL);
    console.log("Mongoose connected");
  }

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });

  return mongoose;
}
