export async function getSupplements() {}
import { connectToDatabase, disconnectDatabase } from "~/database/db.server.js";
import Supplement, { SupplementModel } from "./supplement.model";

export const findSupplement = async (
  query: Record<string, any>
): Promise<SupplementModel[]> => {
  try {
    await connectToDatabase();

    console.log(await Supplement.countDocuments(query).exec());

    return await Supplement.find(query).exec();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await disconnectDatabase();
  }
};
