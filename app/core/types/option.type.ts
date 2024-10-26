import { Types } from "mongoose";

export interface IOption {
  id: Types.ObjectId;
  name: string;
  value: any;
}
