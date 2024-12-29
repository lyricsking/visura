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
var tips_server_exports = {};
__export(tips_server_exports, {
  createTip: () => createTip,
  findOneById: () => findOneById,
  findTipBySlug: () => findTipBySlug,
  findTips: () => findTips,
  generateTips: () => generateTips
});
module.exports = __toCommonJS(tips_server_exports);
var import_mongoose = require("mongoose");
var import_tips = __toESM(require("../models/tips.model"), 1);
var import_faker = require("@faker-js/faker");
const createTip = async (data) => {
  try {
    const tips = await import_tips.default.create(data);
    return tips;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const findOneById = async () => {
  try {
    const tips = await import_tips.default.find().exec();
    return tips;
  } catch (error) {
    throw error;
  }
};
const findTips = async () => {
  try {
    const tips = await import_tips.default.find().exec();
    return tips;
  } catch (error) {
    throw error;
  }
};
const findTipBySlug = async ({
  slug
}) => {
  let response = {};
  try {
    response.data = await import_tips.default.findOne({ slug }).exec();
    return response;
  } catch (error) {
    throw error;
  }
};
const generateObjectId = () => new import_mongoose.Types.ObjectId();
async function generateTips(length = 1) {
  const tip = () => ({
    _id: generateObjectId(),
    slug: import_faker.faker.lorem.slug(),
    teamA: import_faker.faker.company.name(),
    teamB: import_faker.faker.company.name(),
    matchDate: import_faker.faker.date.future(),
    leagueCountry: generateObjectId(),
    league: generateObjectId(),
    teamARank: import_faker.faker.number.int({ min: 1, max: 20 }),
    teamBRank: import_faker.faker.number.int({ min: 1, max: 20 }),
    author: generateObjectId(),
    prediction: {
      outcome: {
        value: import_faker.faker.helpers.arrayElement(["win", "draw", "loss"]),
        reason: import_faker.faker.lorem.sentence()
      },
      scoreline: {
        value: `${import_faker.faker.number.int({
          min: 0,
          max: 5
        })}-${import_faker.faker.number.int({
          min: 0,
          max: 5
        })}`,
        reason: import_faker.faker.lorem.sentence()
      }
    },
    introduction: import_faker.faker.lorem.paragraph(),
    excerpt: import_faker.faker.lorem.sentence(),
    featuredImage: import_faker.faker.image.url(),
    tags: import_faker.faker.helpers.arrayElements(
      ["football", "sports", "prediction", "league", "analysis"],
      import_faker.faker.number.int({ min: 1, max: 5 })
    ),
    publishedOn: import_faker.faker.date.past()
  });
  const tips = [];
  for (let index = 0; index < length; index++) {
    await createTip(tip());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTip,
  findOneById,
  findTipBySlug,
  findTips,
  generateTips
});
//# sourceMappingURL=tips.server.js.map
