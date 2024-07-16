import { Model, Schema, Types } from "mongoose";
import { AddressType, IAddress, IAddressRegion } from "../type/address.type";

export type AddressRegionModel = Model<IAddressRegion>
const addressRegionSchema = new Schema<IAddressRegion, AddressRegionModel>({
    _id: { type: Types.ObjectId },
  name: { type: String, required: true },
  city: { type: String, required: true },
  shippingFee: { type: Number, required: true }
})

export const AddressRegion: AddressRegionModel = mongoose.models.AddressRegion || mongoose.model<IAddressRegion, AddressRegionModel>("AddressRegion", addressRegionSchema);

export type AddressModel = Model<IAddress>
export const addressSchema = new Schema<IAddress, AddressModel>(
  {
    _id: { type: Types.ObjectId },
    type: { type: String, enum: AddressType, required: true },
    address: { type: String, required: true },
    region: { type: Schema.Types.ObjectId, ref: "AddressRegion", required: true },
    email: {type: String, required: true },
    phone: { type: String, required: true },
  },
);

export const Address: AddressModel =
  mongoose.models.Address || mongoose.model<IAddress, AddressModel>("Address", addressSchema);

