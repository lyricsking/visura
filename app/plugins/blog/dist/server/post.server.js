"use strict";
import mongoose from "mongoose";
import PostModel from "../models/post.model";
import { faker } from "@faker-js/faker";
export const createPost = async function(data) {
  let response = {};
  try {
    response.data = await PostModel.create(data);
  } catch (err) {
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
export const findPostById = async (id) => {
  try {
    const post = await PostModel.findById(id).exec();
    return post;
  } catch (error) {
    throw error;
  }
};
export const findPosts = async (fields) => {
  try {
    const posts = await PostModel.find(fields).exec();
    return posts;
  } catch (error) {
    throw error;
  }
};
export const publishPost = async (id) => {
  let response = {};
  try {
    response.data = await PostModel.findById(id).exec().then((post) => post?.publish());
  } catch (err) {
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
export const findPostBySlug = async ({
  slug
}) => {
  try {
    const post = await PostModel.findOne({ slug }).exec();
    return post;
  } catch (error) {
    throw error;
  }
};
export const generateDummyPosts = async (count = 5) => {
  PostModel.deleteMany();
  let postCount = 0;
  for (let i = 0; i < count; i++) {
    await createPost({
      title: faker.lorem.sentence(),
      author: new mongoose.Types.ObjectId(),
      // Dummy ObjectId for the author
      content: faker.lorem.paragraphs(5, "\n\n"),
      excerpt: faker.lorem.paragraph(2),
      featuredImage: faker.image.urlLoremFlickr({ category: "sport" }),
      tags: faker.helpers.arrayElements(
        ["tech", "news", "blogging", "coding", "health"],
        3
      ),
      // Choose random tags
      published: faker.datatype.boolean()
    });
    postCount++;
  }
  return count === postCount;
};
