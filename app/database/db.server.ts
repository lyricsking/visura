import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function createDBConnection(){

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

if (!mongoose.connection.readyState) {
  await mongoose.connect(MONGO_URI);
  console.log('Mongoose connected');
}

process.on("SIGINT", async () => {
  await mongooseClient.conn.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongooseClient.conn.connection.close();
  process.exit(0);
});
  return mongoose;
}

