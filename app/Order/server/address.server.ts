import AddressModel from "~/Dashboard/address/address.model";
import { IAddress } from "~/Dashboard/address/address.type";
import { connectToDatabase, disconnectDatabase } from "~/Shared/database/db.server";

export const createOrUpdateAddress = async ({id,address}:{id?: string, address: IAddress}): Promise<void> => {
  try {
    await connectToDatabase();
    
    await AddressModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...address, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, new: true }
    ).exec();
    console.log("Address saved successfully.");
  } catch (err) {
    console.error("Error saving address.", err);
  } finally{
    disconnectDatabase();
  }
}
