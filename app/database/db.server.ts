import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Declare mongoose global variable
declare global {
  // eslint-disable-next-line no-var
  var mongooseClient: { conn: any; promise: any };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongooseClient;

if (!cached) {
  cached = global.mongooseClient = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongooseClient) => mongooseClient);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

process.on("SIGINT", async () => {
  await mongooseClient.conn.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongooseClient.conn.connection.close();
  process.exit(0);
});

// export default connectToDatabase;
