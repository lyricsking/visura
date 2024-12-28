"use strict";
import { Types } from "mongoose";
import TipsModel from "../models/tips.model";
import { faker } from "@faker-js/faker";
export const createTip = async (data) => {
  try {
    const tips = await TipsModel.create(data);
    return tips;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const findOneById = async () => {
  try {
    const tips = await TipsModel.find().exec();
    return tips;
  } catch (error) {
    throw error;
  }
};
export const findTips = async () => {
  try {
    const tips = await TipsModel.find().exec();
    return tips;
  } catch (error) {
    throw error;
  }
};
export const findTipBySlug = async ({
  slug
}) => {
  let response = {};
  try {
    response.data = await TipsModel.findOne({ slug }).exec();
    return response;
  } catch (error) {
    throw error;
  }
};
const generateObjectId = () => new Types.ObjectId();
export async function generateTips(length = 1) {
  const tip = () => ({
    _id: generateObjectId(),
    slug: faker.lorem.slug(),
    teamA: faker.company.name(),
    teamB: faker.company.name(),
    matchDate: faker.date.future(),
    leagueCountry: generateObjectId(),
    league: generateObjectId(),
    teamARank: faker.number.int({ min: 1, max: 20 }),
    teamBRank: faker.number.int({ min: 1, max: 20 }),
    author: generateObjectId(),
    prediction: {
      outcome: {
        value: faker.helpers.arrayElement(["win", "draw", "loss"]),
        reason: faker.lorem.sentence()
      },
      scoreline: {
        value: `${faker.number.int({
          min: 0,
          max: 5
        })}-${faker.number.int({
          min: 0,
          max: 5
        })}`,
        reason: faker.lorem.sentence()
      }
    },
    introduction: faker.lorem.paragraph(),
    excerpt: faker.lorem.sentence(),
    featuredImage: faker.image.url(),
    tags: faker.helpers.arrayElements(
      ["football", "sports", "prediction", "league", "analysis"],
      faker.number.int({ min: 1, max: 5 })
    ),
    publishedOn: faker.date.past()
  });
  const tips = [];
  for (let index = 0; index < length; index++) {
    await createTip(tip());
  }
}
//# sourceMappingURL=tips.server.js.map
