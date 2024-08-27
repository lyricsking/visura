import TipsModel from "../models/tips.model";
import { ITips } from "../types/tips.type";
import { faker } from '@faker-js/faker';

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

const generateDummyTips = () => {
  const countries = {
    England: ['Premier League', 'Championship'],
    Spain: ['La Liga', 'Segunda Division'],
    Italy: ['Serie A', 'Serie B'],
    Germany: ['Bundesliga', '2. Bundesliga'],
    France: ['Ligue 1', 'Ligue 2'],
  };

  const posts = [];

  for (let i = 0; i < 5; i++) {
    const country = faker.helpers.objectKey(countries);
    const league = faker.helpers.arrayElement(countries[country]);

    posts.push({
      teamA: faker.company.name(),
      teamB: faker.company.name(),
      matchDate: faker.date.future(),
      country,
      league,
      teamARank: faker.datatype.number({ min: 1, max: 20 }),
      teamBRank: faker.datatype.number({ min: 1, max: 20 }),
      author: new mongoose.Types.ObjectId(), // Dummy ObjectId for the author
      introduction: faker.lorem.sentences(2),
      prediction: faker.lorem.sentences(1),
      excerpt: faker.lorem.sentences(2),
      featuredImage: faker.image.sports(),
      tags: faker.helpers.arrayElements(['football', 'prediction', 'sports', 'betting'], 3),
      publishedOn: faker.date.past(),
    });
  }

  return posts;
};

const dummyTips = generateDummyTips();
console.log(dummyTips);
