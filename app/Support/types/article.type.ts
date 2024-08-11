import { Schema, Types } from "mongoose";

export interface IArticle {
  _id: Types.ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
