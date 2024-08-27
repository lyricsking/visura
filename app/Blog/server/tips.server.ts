import mongoose, { Types } from "mongoose";
import TipsModel, { HydratedTips } from "../models/tips.model";
import { Country, ITips } from "../types/tips.type";
import { faker } from "@faker-js/faker";

export const createTip = async (data: ITips): Promise<HydratedTips> => {
  try {
    const tips = await TipsModel.create(data);
    console.log(tips);

    return tips;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import { Country, ITips, PredictionType, League } from '../types/tips.type';

export async function generateDummyTips(
  count: number = 5
): Promise<HydratedTips[]> {
  const countries = Object.keys(Country) as (keyof typeof Country)[];
  const selectedCountry = faker.helpers.arrayElement(countries);
  const selectedLeague = faker.helpers.arrayElement(Country[selectedCountry]) as League;

  let tips = [];
  for (let index = 0; index < count; index++) {
    let tip: ITips = {
      _id: new Types.ObjectId(),
      teamA: faker.company.name(),
      teamB: faker.company.name(),
      matchDate: faker.date.future(),
      country: selectedCountry,
      league: selectedLeague,
      teamARank: faker.number.int({ min: 1, max: 20 }),
      teamBRank: faker.number.int({ min: 1, max: 20 }),
      author: new Types.ObjectId(),
      prediction: 
        {
            [PredictionType.outcome]: {
            value: faker.helpers.arrayElement(['Win', 'Lose', 'Draw']),
            reason: faker.lorem.sentence(),
          },
            [PredictionType.scoreline]: {
            value: `${faker.number.int({ min: 0, max: 5 })}-${faker.number.int({ min: 0, max: 5 })}`,
            reason: faker.lorem.sentence(),
          },
          },
      introduction: faker.lorem.paragraph(),
      excerpt: faker.lorem.sentence(),
      featuredImage: faker.image.url(),
      tags: faker.helpers.arrayElements([
          'football', 'premier league', 'match', 'sports', 'prediction'
        ], 3),
      publishedOn: faker.date.past(),
    }

    tips.push(await createTip(tip));
  }

  return tips;
}
