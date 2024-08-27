import mongoose from "mongoose";
import PostModel, { PostModelType } from "../models/post.model";
import { IPost } from "../types/post.type";
import { faker } from "@faker-js/faker";

export const createBlog = async function (data: IPost): Promise<IPost> {
  try {
    const blog = await PostModel.create(data);
    console.log(blog);

    return blog;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateDummyPosts = (count: number = 5) => {
  const posts = [];

  for (let i = 0; i < count; i++) {
    posts.push({
      title: faker.lorem.sentence(),
      author: new mongoose.Types.ObjectId(), // Dummy ObjectId for the author
      content: faker.lorem.paragraphs(3),
      excerpt: faker.lorem.sentences(2),
      featuredImage: faker.image.url(),
      tags: faker.helpers.arrayElements(
        ["tech", "news", "blogging", "coding", "health"],
        3
      ), // Choose random tags
      publishedOn: faker.date.past(),
    });
  }

  return posts;
};

const dummyPosts = generateDummyPosts();
console.log(dummyPosts);
