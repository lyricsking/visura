import mongoose, { Schema, Document } from "mongoose";
export interface Supplement {
  name: string;
  price: number;
  benefits: string[];
  tags: string[];
  activityRecommendations?: string[];
  gender?: string;
  dietaryRestrictions?: string[];
  allergies?: string[];
  conditions?: string[];
  preferredBrands?: string[];
  sustainable?: boolean;
  form?: string;
  ageRange?: {
    min: number;
    max: number;
  };
}

export interface SupplementWithScore {
  supplement: Supplement;
  score: number;
}

interface ISupplement extends Supplement, Document {}

const SupplementSchema: Schema = new Schema<ISupplement>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: [{ type: String }],
  tags: [{ type: String }],
  activityRecommendations: [{ type: String }],
  gender: { type: String },
  dietaryRestrictions: [{ type: String }],
  allergies: [{ type: String }],
  conditions: [{ type: String }],
  preferredBrands: [{ type: String }],
  sustainable: { type: Boolean },
  form: { type: String },
  ageRange: {
    min: { type: Number },
    max: { type: Number },
  },
});

export const SupplementModel = mongoose.model<ISupplement>(
  "Supplement",
  SupplementSchema
);
