"use strict";
import mongoose, { Schema } from "mongoose";
import { getSlug } from "../utils/slug";
const postSchema = new Schema(
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
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
postSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = getSlug(this.title);
  }
  next();
});
postSchema.pre("save", function(next) {
  this.updatedAt = /* @__PURE__ */ new Date();
  next();
});
postSchema.method("publish", async function() {
  if (!this.published) {
    this.published = true;
    if (!this.publishedOn) {
      this.publishedOn = /* @__PURE__ */ new Date();
    }
  }
  return this.save();
});
const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default PostModel;
