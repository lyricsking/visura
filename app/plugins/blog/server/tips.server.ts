import { Types } from "mongoose";
import TipsModel, { HydratedTips } from "../models/tips.model";
import { DBReponseType } from "~/utils/mongoose";
import { faker } from "@faker-js/faker";
import { ITips } from "../types/tips.type";

export const createTip = async (data: ITips): Promise<HydratedTips> => {
  try {
    const tips = await TipsModel.create(data);

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

export const findTipBySlug = async ({
  slug,
}: any): Promise<DBReponseType<ITips>> => {
  let response: DBReponseType<ITips> = {};
  try {
    response.data = await TipsModel.findOne({ slug }).exec();
    //response.data = generateTips()[0];
    return response;
  } catch (error) {
    throw error;
  }
};

// Helper to generate random ObjectId
const generateObjectId = () => new Types.ObjectId();

// Generator function for ITips
export async function generateTips(length: number = 1) {
  const tip = (): ITips => ({
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
        reason: faker.lorem.sentence(),
      },
      scoreline: {
        value: `${faker.number.int({
          min: 0,
          max: 5,
        })}-${faker.number.int({
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
      ["football", "sports", "prediction", "league", "analysis"],
      faker.number.int({ min: 1, max: 5 })
    ),
    publishedOn: faker.date.past(),
  });

  const tips: ITips[] = [];
  for (let index = 0; index < length; index++) {
    //tips.push(tip());
    await createTip(tip());
  }

  //return tips;
}
