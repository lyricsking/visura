import mongoose, { Types } from "mongoose";
import TipsModel, { HydratedTips } from "../models/tips.model";
import { Country, ITips, League, PredictionType } from "../types/tips.type";
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

export const findOneById = async (): Promise<HydratedTips[]> => {
  try {
    const tips = await TipsModel.find().exec();

    return tips;
  } catch (error) {
    throw error;
  }
};

export const findTips = async (): Promise<HydratedTips[]> => {
  try {
    const tips = await TipsModel.find().exec();

    return tips;
  } catch (error) {
    throw error;
  }
};
export async function generateDummyTips(
  count: number = 5
): Promise<HydratedTips[]> {
  const countries = Object.keys(Country) as (keyof typeof Country)[];
  const selectedCountry = faker.helpers.arrayElement(countries);
  const selectedLeague = faker.helpers.arrayElement(
    Country[selectedCountry]
  ) as League;

  await TipsModel.deleteMany();

  let tips = [];
  for (let index = 0; index < count; index++) {
    let teamA = faker.location.city();
    let teamB = faker.location.city();

    let tip: ITips = {
      _id: new Types.ObjectId(),
      teamA,
      teamB,
      matchDate: faker.date.future(),
      country: selectedCountry,
      league: selectedLeague,
      teamARank: faker.number.int({ min: 1, max: 20 }),
      teamBRank: faker.number.int({ min: 1, max: 20 }),
      author: new Types.ObjectId(),
      prediction: {
        [PredictionType.outcome]: {
          value: faker.helpers.arrayElement([teamA, teamB, "Draw"]),
          reason: faker.lorem.sentence(),
        },
        [PredictionType.scoreline]: {
          value: `${faker.number.int({ min: 0, max: 5 })}-${faker.number.int({
            min: 0,
            max: 5,
          })}`,
          reason: faker.lorem.sentence(),
        },
      },
      introduction: faker.lorem.paragraph(),
      excerpt: faker.lorem.sentence(),
      featuredImage: faker.image.url(),
      tags: faker.helpers.arrayElements(
        ["football", "premier league", "match", "sports", "prediction"],
        3
      ),
      publishedOn: faker.date.past(),
    };

    tips.push(await createTip(tip));
  }

  return tips;
}
