import { Document } from "mongoose";
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { AddressType, IAddress, IAddressRegion } from "../type/address.type";

export interface IAddressRegionModel extends IAddressRegion, Document {}

 const addressRegionSchema = new Schema<IAddressRegionModel>({
  name: String,
  city: String,
  shippingFee: {type: Number, required: true}
})

export const AddressRegionModel: mongoose.Model<IAddressRegionModel> =
  mongoose.models.Address || mongoose.model<IAddressRegionModel>("AddressRegion", addressRegionSchema);

export interface IAddressModel extends IAddress, Document {}

export const addressSchema = new Schema<IAddressModel>(
  {
    type: { type: String, enum: AddressType, required: true },
    address: { type: String, required: true },
    region: { type: Schema.Types.ObjectId, ref: "AddressRegion", required: true },
    email: {type: String, required: true },
    phone: { type: String, required: true },
  },
);

const AddressModel: mongoose.Model<IAddressModel> =
  mongoose.models.Address || mongoose.model<IAddressModel>("Address", addressSchema);
export default AddressModel;
