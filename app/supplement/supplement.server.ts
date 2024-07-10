export async function getSupplements() {}
import {
  connectToDatabase,
  disconnectDatabase,
} from "~/shared/database/db.server.js";
import type { ISupplement, ISupplementModel } from "./supplement.model";
import Supplement from "./supplement.model";
import { Gender } from "./supplement.type";

export const findSupplement = async (
  query: Record<string, any>
): Promise<ISupplementModel[]> => {
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
