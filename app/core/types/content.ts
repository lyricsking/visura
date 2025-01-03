import { Types } from "mongoose";

export interface Field {
  name: string; // name
  // title: string; // Name
  type: string; // string, number, boolean etc
  required: boolean;
}

export interface IContentType {
  _id: Types.ObjectId;
  name: string; // name of the content e.g product
  modelName: string; // name of the schema e.g Product
  fields: Field[];
  createdAt: Date;
  updatedAt: Date;
}

export type PluginSchema = Pick<IContentType, "name" | "modelName" | "fields">;
