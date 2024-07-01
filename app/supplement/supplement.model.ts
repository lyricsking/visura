import mongoose, { Schema, Document } from "mongoose";

interface ISupplementModel extends ISupplement, Document {
}

const SupplementSchema: Schema = new Schema<ISupplementModel>({
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

const Supplement: Model<ISupplementModel> =
  mongoose.models.Supplement ||
  mongoose.model<ISupplementModel>("Supplement", SupplementSchema);
export default Supplement;
export type { ISupplement, ISupplementModel };