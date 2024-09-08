import Supplement from "../models/supplement.model";
import { ISupplement } from "../types/supplement.type";

export async function getSupplements() {}

export const findSupplement = async (
  query: Record<string, any>
): Promise<ISupplement[]> => {
  try {
    console.log(await Supplement.countDocuments(query).exec());

    return await Supplement.find(query).exec();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
