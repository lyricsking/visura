import { Model, Schema, model } from "mongoose";
import { IArticle } from "../types/article.type";
import { models } from "mongoose";

// Article Schema
const articleSchema = new Schema<IArticle>({
  _id: { type: Types.ObjectId, required: true, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export type SupportArticleModel = Model<ISupportArticle>;

// Support Article Category Schema
const supportArticleCategorySchema = new Schema<ISupportArticle, SupportArticleModel>({
  _id: { type: Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  articles: { type: [articleSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
const SupportArticleCategory = model<ISupportArticleCategory>(
  "SupportArticleCategory",
  supportArticleCategorySchema
);
