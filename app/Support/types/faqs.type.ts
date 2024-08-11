import { Schema, Types } from "mongoose";

export interface IFaqs {
  _id: Types.ObjectId;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}
