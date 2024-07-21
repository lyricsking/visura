import mongoose, { Schema, Model } from "mongoose";
import type { ISupplement } from "./supplement.type";

export type SupplementModel = Model<ISupplement>
const supplementSchema: Schema = new Schema<ISupplement, SupplementModel>({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String },
  preferences: [{ type: String }],
  activityLevel: { type: String },
  healthGoals: [{ type: String }],
  healthConcerns: [{ type: String }],
  dietaryRestrictions: [{ type: String }],
  allergies: [{ type: String }],
  benefits: [{ type: String }],
  tags: [{ type: String }],
  form: { type: String },
  ageRange: {
    min: { type: Number },
    max: { type: Number },
  },
});

const Supplement: SupplementModel =
  mongoose.models.Supplement ||
  mongoose.model<ISupplement, SupplementModel>("Supplement", supplementSchema);

export default Supplement;