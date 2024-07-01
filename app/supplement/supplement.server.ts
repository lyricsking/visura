export async function getSupplements() {}
import Supplement from "./supplement.type.ts"
import type { ISupplement } from './supplement.type.ts';

const supplements: ISupplement[] = [
  
];

export const seedSupplement = async () => {
  try {
    await Supplement.deleteMany({});
    await Supplement.insertMany(supplements);
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export const findSupplement = async (query: Record<string, any>): Promise<ISupplement[] | undefined> => {
  try {
    await connectToDatabase()
    
    return await SupplementModel.find(query).exec();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await disconnectDatabase()
  }
}