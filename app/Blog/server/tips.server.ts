import mongoose from "mongoose";
import TipsModel from "../models/tips.model";
import { ITips } from "../types/tips.type";
import { faker } from "@faker-js/faker";

export const createTips = async (data: ITips) => {
  try {
    const tips = await TipsModel.create(data);
    console.log(tips);

    return tips;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

function generateDummyTips(): ITips {
  const countries = Object.keys(Country) as (keyof typeof Country)[];
  const selectedCountry = faker.helpers.arrayElement(countries);
  const selectedLeague = faker.helpers.arrayElement(Country[selectedCountry]);

  return {
    _id: new Types.ObjectId(),
    teamA: faker.company.name(),
    teamB: faker.company.name(),
    matchDate: faker.date.future(),
    country: selectedCountry,
    league: selectedLeague,
    teamARank: faker.datatype.number({ min: 1, max: 20 }),
    teamBRank: faker.datatype.number({ min: 1, max: 20 }),
    author: new Types.ObjectId(),
    prediction: [
      {
        type: ["outcome"],
        value: faker.helpers.arrayElement(['Win', 'Lose', 'Draw']),
        reason: faker.lorem.sentence(),
      },
      {
        type: ["scoreline"],
        value: `${faker.datatype.number({ min: 0, max: 5 })}-${faker.datatype.number({ min: 0, max: 5 })}`,
        reason: faker.lorem.sentence(),
      },
    ],
    introduction: faker.lorem.paragraph(),
    excerpt: faker.lorem.sentence(),
    featuredImage: faker.image.sports(),
    tags: faker.helpers.arrayElements([
      'football', 'premier league', 'match', 'sports', 'prediction'
    ], 3),
    publishedOn: faker.date.past(),
  };
}