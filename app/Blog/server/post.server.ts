import mongoose, { ObjectId } from "mongoose";
import PostModel from "../models/post.model";
import { IPost } from "../types/post.type";
import { faker } from "@faker-js/faker";

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
): Promise<IPost> {
  try {
    const blog = await PostModel.create(data);
    console.log(blog);

    return blog;
  } catch (error) {
    console.log(error);
    throw error;
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

const dummyPosts = generateDummyPosts(10);
console.log(dummyPosts);
