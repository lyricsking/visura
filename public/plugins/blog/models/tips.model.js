"use strict";
import mongoose, {
  Schema,
  model
} from "mongoose";
import { PredictionType } from "../types/tips.type";
const predictionSchema = new Schema(
  {
    [PredictionType.outcome]: {
      value: { type: String, required: true },
      reason: { type: String, required: true }
    },
    [PredictionType.scoreline]: {
      value: { type: String, required: true },
      reason: { type: String, required: true }
    }
  },
  { _id: false }
  // Disable _id for subdocument schema
);
const tipsSchema = new Schema(
  {
    slug: { type: String, unique: true },
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    matchDate: { type: Date, required: true },
    leagueCountry: {
      type: Schema.Types.ObjectId,
      ref: "LeagueCountry",
      required: true
    },
    league: {
      type: Schema.Types.ObjectId,
      ref: "League",
      required: true
      /* validate: {
              validator: async function (league) {
                const mLeague = await LeagueModel.findById(league);
                if (!mLeague) {
                  throw new Error("League not found");
                }
      
                // Check if the League belongs to the selected country
                return mLeague.country.equals(this.leagueCountry);
              },
              message: "Invalid league for the selected country.",
            },
          */
    },
    teamARank: { type: Number, required: true },
    teamBRank: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    prediction: {
      type: predictionSchema,
      required: true
    },
    introduction: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    tags: { type: [String], required: true },
    publishedOn: { type: Date }
  },
  {
    timestamps: true
    // Automatically manage createdAt and updatedAt fields
  }
);
const TipsModel = mongoose.models.Tips || model("Tips", tipsSchema);
export default TipsModel;
//# sourceMappingURL=tips.model.js.map
