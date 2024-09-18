import mongoose, { Model, Schema, model } from "mongoose";
import { IFaqs } from "../types/faqs.type";

export type FaqsModel = Model<IFaqs>;

const articleSchema = new Schema<IFaqs, FaqsModel>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Faqs: FaqsModel =
  mongoose.models.Faqs || model<IFaqs, FaqsModel>("Faqs", articleSchema);

export default Faqs;