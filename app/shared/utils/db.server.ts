import mongoose from "mongoose";
// declare mongoose global variable
declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: typeof mongoose | null;
}

//export const connectToDatabase = async (): Promise<typeof mongoose> => {
if (!global.__mongoClient) {
  try {
    // Replace the connection string with your MongoDB URI
    global.__mongoClient = await mongoose.connect(
      process.env.MONGODB_URI || ""
    );
    console.log("Connected to the database");
  } catch (error) {
    global.__mongoClient = null;
    console.error("Error connecting to the database", error);
    throw error;
  }
}

export const mongooseClient = global.__mongoClient;
//  return global.__mongoClient;
//};
