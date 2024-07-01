export async function getSupplements() {}
import { connectToDatabase, disconnectDatabase } from "~/shared/utils/db.server.js";
import Supplement from "./supplement.type"
import type { ISupplement } from './supplement.type';

export const findSupplement = async (query: Record<string, any>): Promise<ISupplement[] > => {
  try {
    await connectToDatabase()
    
    return await Supplement.find(query).exec();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await disconnectDatabase()
  }
}