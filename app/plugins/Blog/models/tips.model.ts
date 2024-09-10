import mongoose, {
  Schema,
  model,
  Types,
  Model,
  HydratedDocument,
} from "mongoose";
import {
  ITips,
  Country,
  IPrediction,
  PredictionType,
  League,
} from "../types/tips.type";

export type TipsModelType = Model<ITips>;

// Define the schema for IPrediction
const predictionSchema = new Schema<IPrediction>({
    [PredictionType.outcome]: {
      value: { type: String, required: true },
      reason: { type: String, required: true },
    },
    [PredictionType.scoreline]: {
      value: { type: String, required: true },
      reason: { type: String, required: true },
    },
  },
  { _id: false } // Disable _id for subdocument schema
);

// Define the schema for the Tips model
const tipsSchema = new Schema<ITips, TipsModelType>(
  {
    teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  matchDate: { type: Date, required: true },
  country: { type: String, enum: Object.keys(Country), required: true },
  league: { type: String, enum: League, required: true },
  teamARank: { type: Number, required: true },
  teamBRank: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  prediction: {
    type: predictionSchema,
    required: true,
  },
  introduction: { type: String, required: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String, required: true },
  tags: { type: [String], required: true },
  publishedOn: { type: Date },
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

export type HydratedTips = HydratedDocument<ITips>;
// Create the Tips model
const TipsModel: TipsModelType =
  mongoose.models.Tips || model("Tips", tipsSchema);

export default TipsModel;
