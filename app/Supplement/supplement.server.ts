export async function getSupplements() {}
import Supplement, { SupplementModel } from "./supplement.model";
import { ISupplement } from "./supplement.type";

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
