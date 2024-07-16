import mongoose from "mongoose";

export interface IAddressRegion {
  name: string,// Defined as CITY_regionNameCharsSeparatedByHyphen e.g IBADAN_idi-ape
  city: string, //  Defined as twoOrThreeStateNameUppercaseChars_city e.g OYO_ibadan
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
  email: string;
  phone: string;
}
