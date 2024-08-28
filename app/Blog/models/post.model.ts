import mongoose, { Schema, model, Types, Model } from "mongoose";
import { IPost } from "../types/post.type";

export type PostModelType = Model<IPost>;
// Define the schema for the News model
const postSchema = new Schema<IPost, PostModelType>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    tags: { type: [String], required: true },
    publishedOn: { type: Date, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Post model
const PostModel: PostModelType =
  mongoose.models.Post || mongoose.model("Post", postSchema);

export default PostModel;
