import { MongoClient, ServerApiVersion } from 'mongodb'

// declare prisma global variable
declare global {
  var __mongoClient: MongoClient;
}
// Create a singleton instance of prisma
if (!global.__mongoClient) {
  global.__mongoClient = new MongoClient(process.env.MONGODB_URI as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
}
// Create a connection
await global.__mongoClient.connect();
export const dbClient = global.__mongoClient.db(process.env.MONGODB_NAME);