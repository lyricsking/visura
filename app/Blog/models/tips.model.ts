import mongoose, { Schema, model, Types, Model } from "mongoose";
import { ITips, Country } from "../types/tips.type";

export type TipsModelType = Model<ITips>;

// Define the schema for the Tips model
const tipsSchema = new Schema<ITips, TipsModelType>(
  {
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    matchDate: { type: Date, required: true },
    country: { type: String, enum: Object.keys(Country), required: true },
    league: {
      type: String,
      enum: Object.values(Country).flat(),
      required: true,
    },
    teamARank: { type: Number, required: true },
    teamBRank: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    introduction: { type: String, required: true },
    prediction: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    tags: { type: [String], required: true },
    publishedOn: { type: Date },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Tips model
const TipsModel: TipsModelType =
  mongoose.models.Tips || model("Tips", tipsSchema);

export default TipsModel;