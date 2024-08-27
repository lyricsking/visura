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

export async function generateDummyTips(
  count: number = 5
): Promise<HydratedTips[]> {
  const countries = Object.keys(Country) as (keyof typeof Country)[];
  const selectedCountry = faker.helpers.arrayElement(countries);
  const selectedLeague = faker.helpers.arrayElement(Country[selectedCountry]);

  let tips = [];
  for (let index = 0; index < count; index++) {
    let tip: ITips = {
      _id: new Types.ObjectId(),
      teamA: faker.location.city(),
      teamB: faker.location.city(),
      matchDate: faker.date.future(),
      country: selectedCountry,
      league: selectedLeague,
      teamARank: faker.number.int({ min: 1, max: 20 }),
      teamBRank: faker.number.int({ min: 1, max: 20 }),
      author: new Types.ObjectId(),
      prediction: [
        {
          type: "outcome",
          value: faker.helpers.arrayElement(["Win", "Lose", "Draw"]),
          reason: faker.lorem.sentence(),
        },
        {
          type: "scoreline",
          value: `${faker.number.int({
            min: 0,
            max: 5,
          })}-${faker.number.int({ min: 0, max: 5 })}`,
          reason: faker.lorem.sentence(),
        },
      ],
      introduction: faker.lorem.paragraph(),
      excerpt: faker.lorem.sentence(),
      featuredImage: faker.image.urlLoremFlickr({ category: "sport" }),
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
