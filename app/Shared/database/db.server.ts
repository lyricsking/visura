import mongoose from "mongoose";

// Declare mongoose global variable
declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: typeof mongoose | null;
}

global.__mongoClient = global.__mongoClient || null;

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (!global.__mongoClient) {
    try {
      // Replace the connection string with your MongoDB URI
      global.__mongoClient = await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("Connected to the database");
    } catch (error) {
      global.__mongoClient = null;
      console.error("Error connecting to the database", error);
      throw error;
    }
  }

  return global.__mongoClient;
};

export const disconnectDatabase = async (): Promise<void> => {
  if (global.__mongoClient) {
    await mongoose.disconnect();
    global.__mongoClient = null;
    console.log("Disconnected from the database");
  }
};
