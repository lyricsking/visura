import {
  Address,
  AddressRegion,
  AddressRegionModel,
  type AddressModel,
} from "../models/address.model";
import { HydratedDocument, Types } from "mongoose";
import { IAddress, IAddressRegion } from "../types/address.type";

export const createOrUpdateAddress = async ({
  id,
  address,
}: {
  id?: string;
  address: AddressModel;
}): Promise<void> => {
  try {
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
  } 
};

export const getAddress = async (id: string) => {
  try {

    const address = await Address.findById(id).exec();
    console.log("Fetched address success: ", address);

    return address;
  } catch (e) {
    console.log("Failed to fetch address:", e);
  } 
};

export const getAddressesByEmail = async (
  email: string
): Promise<IAddress[]> => {
  try {

    const addresses = await Address.find({ email: email }).exec();
    console.log("Fetched addresses success: ", addresses);

    return addresses;
  } catch (e) {
    console.log("Failed to fetch addresses:", e);
    throw e;
  }
};

export const getAddressRegions = async (): Promise<
  HydratedDocument<IAddressRegion>[]
> => {
  try {

    const regions = await AddressRegion.find({}).exec();

    console.log("Fetched regions success: ", regions);

    return regions;
  } catch (e) {
    console.log("Failed to fetch regions :", e);
    throw e;
  } 
};

export const deleteAddress = async (id: Types.ObjectId) => {};
