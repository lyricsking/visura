import { connectToDatabase, disconnectDatabase } from "~/Shared/database/db.server";
import { Address, AddressRegion, AddressRegionModel, type AddressModel } from "../model/address.model";
import { HydratedDocument, Types } from "mongoose";
import { OrderModel } from "../model/order.model";
import { IAddress, IAddressRegion } from "../type/address.type";

export const createOrUpdateAddress = async ({
  id,
  address,
}: {
  id?: string;
  address: AddressModel;
}): Promise<void> => {
  try {
    await connectToDatabase();

    await Address.findOneAndUpdate(
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
  } finally {
    await disconnectDatabase();
  }
};

export const getAddress = async (id: string) => {
  try {
    await connectToDatabase();
    
    const address = await Address.findById(id).exec();
    console.log("Fetched address success: ", address);
    
    return address;
  } catch (e) {
    console.log("Failed to fetch address:", e)
  } finally {
    await disconnectDatabase();
  }
}

export const getAddressesByEmail = async (
  email: string
): Promise<IAddress[]> => {
  try {
    await connectToDatabase();

    const addresses = await Address.find({ email: email }).exec();
    console.log("Fetched addresses success: ", addresses);

    return addresses;
  } catch (e) {
    console.log("Failed to fetch addresses:", e);
    throw e;
  } finally {
    await disconnectDatabase();
  }
};

export const getAddressRegions = async (): Promise<HydratedDocument<IAddressRegion>[]> => {
  try {
    await connectToDatabase();

    const regions = await AddressRegion.find({}).exec();

    console.log("Fetched regions success: ", regions);

    return regions;
  } catch (e) {
    console.log("Failed to fetch regions :", e);
    throw e;
  } finally {
    await disconnectDatabase();
  }
};

export const deleteAddress = async (id: Types.ObjectId) => {  }