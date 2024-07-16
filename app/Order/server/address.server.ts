import AddressModel from "~/Dashboard/address/address.model";
import { IAddress } from "~/Dashboard/address/address.type";
import { connectToDatabase, disconnectDatabase } from "~/Shared/database/db.server";

export const createOrUpdateAddress = async ({id, address}:{id?: string, address: IAddress}): Promise<void> => {
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
    await disconnectDatabase();
  }
}

export const getAddress = (id: string) => {
  try {
    await connectToDatabase();
    
    const address = await AddressModel.findById(id).exec();
    console.log("Fetched address success: ", address);
    
    return address;
  } catch (e) {
    console.log("Failed to fetch address:", e)
  } finally {
    await disconnectDatabase();
  }
}

export const getAddressesByEmail = (email: string) => {
  try {
    await connectToDatabase();
    
    const addresses = await AddressModel.findOne({email: email}).exec();
    console.log("Fetched addresses success: ", addresses);
    
    return addresses;
  } catch (e) {
    console.log("Failed to fetch addresses:", e)
  } finally {
    await disconnectDatabase();
  }
}

export const getAddressRegions = () => {
  try {
    await connectToDatabase();
    
    const regions = await AddressRegionModel.find({}).exec();
    
    console.log("Fetched regions success: ", regions);
    
    return regions;
  } catch (e) {
    console.log("Failed to fetch regions :", e)
  } finally {
    await disconnectDatabase();
  }
}