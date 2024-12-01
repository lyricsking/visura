import mongoose, { ObjectId, ValidatorFunction } from "mongoose";
import PostModel, { PostModelType } from "../models/post.model";
import { IPost } from "../types/post.type";
import { faker } from "@faker-js/faker";
import { DBReponse } from "~/shared/utils/mongoose";

export const createPost = async function (
  data: Pick<
    IPost,
    | "author"
    | "title"
    | "content"
    | "excerpt"
    | "featuredImage"
    | "published"
    | "tags"
  >
): Promise<DBReponse<IPost>> {
  let response: DBReponse<IPost> = {};

  try {
    response.data = await PostModel.create(data);
  } catch (err: mongoose.Error.ValidationError | any) {
    if (err instanceof mongoose.Error.ValidationError) {
      response.error = err;
    } else {
      console.log(err);
      throw err;
    }
  } finally {
    return response;
  }
};

export const findPostById = async (id: string | ObjectId): Promise<any> => {
  try {
    const post = await PostModel.findById(id).exec();

    return post;
  } catch (error) {
    throw error;
  }
};

export const findPosts = async (fields: Partial<IPost>): Promise<IPost[]> => {
  try {
    const posts = await PostModel.find(fields).exec();

    return posts;
  } catch (error) {
    throw error;
  }
};

export const publishPost = async (
  id: string | ObjectId
): Promise<DBReponse<IPost>> => {
  let response: DBReponse<IPost> = {};
  try {
    response.data = await PostModel.findById(id)
      .exec()
      .then((post) => post?.publish());
  } catch (err: mongoose.Error.ValidationError | any) {
    if (err instanceof mongoose.Error.ValidationError) {
      response.error = err;
    } else {
      console.log(err);
      throw err;
    }
  } finally {
    return response;
  }
};

type FindPostBySlugType = {
  slug: IPost["slug"];
};

export const findPostBySlug = async ({
  slug,
}: FindPostBySlugType): Promise<IPost | null> => {
  try {
    const post = await PostModel.findOne({ slug }).exec();

    return post;
  } catch (error) {
    throw error;
  }
};

export const generateDummyPosts = async (
  count: number = 5
): Promise<boolean> => {
  PostModel.deleteMany();
  let postCount = 0;
  for (let i = 0; i < count; i++) {
    await createPost({
      title: faker.lorem.sentence(),
      author: new mongoose.Types.ObjectId(), // Dummy ObjectId for the author
      content: faker.lorem.paragraphs(5, "\n\n"),
      excerpt: faker.lorem.paragraph(2),
      featuredImage: faker.image.urlLoremFlickr({ category: "sport" }),
      tags: faker.helpers.arrayElements(
        ["tech", "news", "blogging", "coding", "health"],
        3
      ), // Choose random tags
      published: faker.datatype.boolean(),
    });

    postCount++;
  }

  return count === postCount;
};

//const dummyPosts = generateDummyPosts(10);
//console.log(dummyPosts);
