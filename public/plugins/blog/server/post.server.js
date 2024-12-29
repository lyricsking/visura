"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_server_exports = {};
__export(post_server_exports, {
  createPost: () => createPost,
  findPostById: () => findPostById,
  findPostBySlug: () => findPostBySlug,
  findPosts: () => findPosts,
  generateDummyPosts: () => generateDummyPosts,
  publishPost: () => publishPost
});
module.exports = __toCommonJS(post_server_exports);
var import_mongoose = __toESM(require("mongoose"), 1);
var import_post = __toESM(require("../models/post.model"), 1);
var import_faker = require("@faker-js/faker");
const createPost = async function(data) {
  let response = {};
  try {
    response.data = await import_post.default.create(data);
  } catch (err) {
    if (err instanceof import_mongoose.default.Error.ValidationError) {
      response.error = err;
    } else {
      console.log(err);
      throw err;
    }
  } finally {
    return response;
  }
};
const findPostById = async (id) => {
  try {
    const post = await import_post.default.findById(id).exec();
    return post;
  } catch (error) {
    throw error;
  }
};
const findPosts = async (fields) => {
  try {
    const posts = await import_post.default.find(fields).exec();
    return posts;
  } catch (error) {
    throw error;
  }
};
const publishPost = async (id) => {
  let response = {};
  try {
    response.data = await import_post.default.findById(id).exec().then((post) => post?.publish());
  } catch (err) {
    if (err instanceof import_mongoose.default.Error.ValidationError) {
      response.error = err;
    } else {
      console.log(err);
      throw err;
    }
  } finally {
    return response;
  }
};
const findPostBySlug = async ({
  slug
}) => {
  try {
    const post = await import_post.default.findOne({ slug }).exec();
    return post;
  } catch (error) {
    throw error;
  }
};
const generateDummyPosts = async (count = 5) => {
  import_post.default.deleteMany();
  let postCount = 0;
  for (let i = 0; i < count; i++) {
    await createPost({
      title: import_faker.faker.lorem.sentence(),
      author: new import_mongoose.default.Types.ObjectId(),
      // Dummy ObjectId for the author
      content: import_faker.faker.lorem.paragraphs(5, "\n\n"),
      excerpt: import_faker.faker.lorem.paragraph(2),
      featuredImage: import_faker.faker.image.urlLoremFlickr({ category: "sport" }),
      tags: import_faker.faker.helpers.arrayElements(
        ["tech", "news", "blogging", "coding", "health"],
        3
      ),
      // Choose random tags
      published: import_faker.faker.datatype.boolean()
    });
    postCount++;
  }
  return count === postCount;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost,
  findPostById,
  findPostBySlug,
  findPosts,
  generateDummyPosts,
  publishPost
});
//# sourceMappingURL=post.server.js.map
