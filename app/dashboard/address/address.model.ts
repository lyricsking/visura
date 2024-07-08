import { Document } from "mongoose";
import { type IAddress } from "./address.type";

export interface IAddressModel extends IAddress, Document {}
