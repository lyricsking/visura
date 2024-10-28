import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function createDBConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }

  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGODB_URI);
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
