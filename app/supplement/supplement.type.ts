import mongoose, { Schema, Document } from "mongoose";

type Gender = 
  "male"|
  "female"|
  "other"


export interface ISupplement extends Document {
  name: string;
  price: number;
  gender: Gender;
  preferences: string[];
  activityLevel: string;
  healthGoals: string[];
  healthConcerns: string[];
  dietaryRestrictions?: string[];
  allergies?: string[];
  benefits: string[];
  tags: string[];
  form?: string;
  ageRange?: {
    min: number;
    max: number;
  };
}

export interface SupplementWithScore {
  supplement: ISupplement;
  weight: number; //  Calculated weight based on relevance to user's selections
}

const SupplementSchema: Schema = new Schema<ISupplement>({
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

const Supplement =
  mongoose.models.Supplement ||
  mongoose.model<ISupplement>("Supplement", SupplementSchema);
export default Supplement;
