import mongoose, { Schema, Document } from "mongoose";

export interface Supplement {
  name: string;
  price: number;
  gender?: string;
  preferences: string[],
  healthGoals: string[], 
  healthConcerns: string[],
  dietaryRestrictions?: string[];
  allergies?: string[];
  benefits?: string[]
  tags?: string[]
  form?: string;
  ageRange?: {
    min: number;
    max: number;
  };
}

interface ISupplement extends Supplement, Document {}

const SupplementSchema: Schema = new Schema<ISupplement>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String },
  preferences: [{ type: String}],
  activityLevel: {type: String},
  healthGoals: {type: String}, 
  healthConcerns: {type: String},
  dietaryRestrictions: [{ type: String }],
  allergies: [{ type: String }],
  benefits: [{type: string}],
  tags: [{type: string}],
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
