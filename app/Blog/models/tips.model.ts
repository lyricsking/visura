import mongoose, { Schema, model, Types, Model } from "mongoose";
import {
  ITips,
  Country,
  IPrediction,
  PredictionType,
} from "../types/tips.type";

export type TipsModelType = Model<ITips>;

const predictionSchema = new Schema<IPrediction>({
  type: {
    type: [String],
    enum: Object.keys(PredictionType),
    required: true,
  },
  value: { type: String, required: true },
  reason: { type: String, required: true },
});

// Define the schema for the Tips model
const tipsSchema = new Schema<ITips, TipsModelType>(
  {
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    matchDate: { type: Date, required: true },
    country: {
      type: String,
      enum: Object.keys(Country),
      required: true,
    },
    league: {
      type: String,
      enum: Object.values(Country).flat(),
      required: true,
    },
    teamARank: { type: Number, required: true },
    teamBRank: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    prediction: { type: [predictionSchema], required: true },
    introduction: { type: String, required: true },
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
