import mongoose, { Schema, model, Types, Model } from "mongoose";
import { IPost } from "../types/post.type";
import { getSlug } from "../utils/slug";

export interface IPostMethods {
  publish(): Promise<IPost>;
}

export type PostModelType = Model<IPost, {}, IPostMethods>;

// Define the schema for the News model
const postSchema = new Schema<IPost, PostModelType>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    tags: { type: [String], required: true },
    published: { type: Boolean, default: false },
    publishedOn: { type: Date },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre("save", function (next) {
  // If the title is not modified there's no need to generate new slug
  if (!this.isModified("title")) {
    return next();
  }
  // Only generate slug when the post is created or title modified.
  this.slug = getSlug(this.title);

  next();
});

// Middleware to update the `updatedAt` field on every save
postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Instance method to check password validity
postSchema.method("publish", async function (): Promise<IPost> {
  this.published = true;
  this.publishedOn = new Date();

  return this.save();
});

// Create the Post model
const PostModel: PostModelType =
  mongoose.models.Post || mongoose.model("Post", postSchema);

export default PostModel;
