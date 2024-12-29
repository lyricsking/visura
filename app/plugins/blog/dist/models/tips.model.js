"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tips_model_exports = {};
__export(tips_model_exports, {
  default: () => tips_model_default
});
module.exports = __toCommonJS(tips_model_exports);
var import_mongoose = __toESM(require("mongoose"), 1);
var import_tips = require("../types/tips.type");
const predictionSchema = new import_mongoose.Schema(
  {
    [import_tips.PredictionType.outcome]: {
      value: { type: String, required: true },
      reason: { type: String, required: true }
    },
    [import_tips.PredictionType.scoreline]: {
      value: { type: String, required: true },
      reason: { type: String, required: true }
    }
  },
  { _id: false }
  // Disable _id for subdocument schema
);
const tipsSchema = new import_mongoose.Schema(
  {
    slug: { type: String, unique: true },
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    matchDate: { type: Date, required: true },
    leagueCountry: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "LeagueCountry",
      required: true
    },
    league: {
      type: import_mongoose.Schema.Types.ObjectId,
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
    author: { type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
const TipsModel = import_mongoose.default.models.Tips || (0, import_mongoose.model)("Tips", tipsSchema);
var tips_model_default = TipsModel;
//# sourceMappingURL=tips.model.js.map
