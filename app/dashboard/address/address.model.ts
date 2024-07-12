import { Document } from "mongoose";
import { type IAddress } from "./address.type";

export interface IAddressRegionModel extends IAddressRegion, Document {}

const addressRegionSchema = new Schema<IAddressRegionModel>({
  name: String,
  city: String,
  shippingFee: {type: Number, required: true}
})

const AddressRegionModel: mongoose.Model<IAddressRegionModel> =
  mongoose.models.Address || mongoose.model<IAddressRegionModel>("AddressRegion", addressRegionSchema);
export default AddressRegionModel;

export interface IAddressModel extends IAddress, Document {}

const addressSchema = new Schema<IAddressModel>(
  {
    type: { type: String, required: true },
    address: { type: String, required: true },
    region: {type: Schema.Type.ObjectId, ref: "AddressRegion", required: true, index: { unique: true} },
    phone: { type: Number, required: true },
  },
);

const AddressModel: mongoose.Model<IAddressModel> =
  mongoose.models.Address || mongoose.model<IAddressModel>("Address", addressSchema);
export default AddressModel;
