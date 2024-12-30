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
var league_model_exports = {};
__export(league_model_exports, {
  LeagueCountryModel: () => LeagueCountryModel,
  LeagueModel: () => LeagueModel
});
module.exports = __toCommonJS(league_model_exports);
var import_mongoose = require("mongoose");
var import_mongoose2 = __toESM(require("mongoose"), 1);
const leagueCountrySchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    // Ensure category names are unique
    trim: true
  }
});
const leagueSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "LeagueCountry",
    required: true
    // Ensure each league is linked to a country
  }
});
const LeagueCountryModel = import_mongoose2.default.models.LeagueCountry || import_mongoose2.default.model("LeagueCountry", leagueCountrySchema);
const LeagueModel = import_mongoose2.default.models.League || import_mongoose2.default.model("League", leagueSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeagueCountryModel,
  LeagueModel
});
//# sourceMappingURL=league.model.js.map
