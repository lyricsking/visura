import mongoose from "mongoose";

export interface IAddressRegion {
  name: string,// Defined as regionNameCharsSeparatedByHyphen_CITY e.g idi-ape_IBADAN
  city: string, //  Defined as city_twoOrThreeStateNameUppercaseChars e.g ibadan_OYO
  shippingFee: number //  Shipping fee to the region
}

export const AddressType = {
  Home: "Home",
  Office: "Office"
} as const;
export type AddressType = typeof AddressType[keyof typeof AddressType]

export interface IAddress {
  type: AddressType;
  address: string;
  region: mongoose.Types.ObjectId|IAddressRegion;
  phone: string;
}
