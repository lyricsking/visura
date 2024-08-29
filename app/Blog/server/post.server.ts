import mongoose, { ObjectId } from "mongoose";
import PostModel from "../models/post.model";
import { IPost } from "../types/post.type";
import { faker } from "@faker-js/faker";

export const createPost = async function (
  data: Omit<IPost, "_id">
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
export const generateDummyPosts = async (count: number = 5) => {
  const posts: IPost[] = [];

  PostModel.deleteMany();

  for (let i = 0; i < count; i++) {
    let post: Omit<IPost, "_id"> = {
      title: faker.lorem.sentence(),
      slug: faker.helpers.slugify(faker.lorem.sentence().toLowerCase()),
      author: new mongoose.Types.ObjectId(), // Dummy ObjectId for the author
      content: faker.lorem.paragraphs(5, "\n\n"),
      excerpt: faker.lorem.paragraph(2),
      featuredImage: faker.image.urlLoremFlickr({ category: "sport" }),
      tags: faker.helpers.arrayElements(
        ["tech", "news", "blogging", "coding", "health"],
        3
      ), // Choose random tags
      publishedOn: faker.date.recent(),
    };

    posts.push(await createPost(post));
  }

  return posts;
};

const dummyPosts = generateDummyPosts(10);
console.log(dummyPosts);
