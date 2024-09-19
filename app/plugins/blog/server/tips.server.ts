import { Types } from "mongoose";
import TipsModel, { HydratedTips } from "../models/tips.model";
import { DBReponseType } from "~/utils/mongoose";
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

export const findTipBySlug = async ({
  slug,
}: any): Promise<DBReponseType<ITips>> => {
  let response: DBReponseType<ITips> = {};
  try {
    // !response.data = await TipsModel.findOne({ slug }).exec();
    response.data = generateTips()[0];
    return response;
  } catch (error) {
    throw error;
  }
};

// Helper to generate random ObjectId
const generateObjectId = () => new Types.ObjectId();

const PredictionType = {
  outcome: "outcome",
  scoreline: "scoreline",
} as const;
type PredictionType = keyof typeof PredictionType;

type IPrediction = Record<
  PredictionType,
  {
    value: string;
    reason: string;
  }
>;

interface ITips {
  _id: Types.ObjectId;
  slug: string;
  teamA: string;
  teamB: string;
  matchDate: Date;
  leagueCountry: Types.ObjectId;
  league: Types.ObjectId;
  teamARank: number;
  teamBRank: number;
  author: Types.ObjectId;
  prediction: IPrediction;
  introduction: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}

// Generator function for ITips
export function generateTips(length: number = 1): ITips[] {
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
    featuredImage: faker.image.imageUrl(),
    tags: faker.helpers.arrayElements(
      ["football", "sports", "prediction", "league", "analysis"],
      faker.datatype.number({ min: 1, max: 5 })
    ),
    publishedOn: faker.date.past(),
  });

  const tips: ITips[] = [];
  for (let index = 0; index < length; index++) {
    tips.push(tip());
  }

  return tips;
}
