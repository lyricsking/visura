"use strict";
import { Schema } from "mongoose";
import mongoose from "mongoose";
const leagueCountrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    // Ensure category names are unique
    trim: true
  }
});
const leagueSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "LeagueCountry",
    required: true
    // Ensure each league is linked to a country
  }
});
export const LeagueCountryModel = mongoose.models.LeagueCountry || mongoose.model("LeagueCountry", leagueCountrySchema);
export const LeagueModel = mongoose.models.League || mongoose.model("League", leagueSchema);
//# sourceMappingURL=league.model.js.map
