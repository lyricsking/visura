import { Model, Schema, model } from "mongoose";
import { IArticle } from "../types/article.type";
import { models } from "mongoose";

export type ArticleModel = Model<IArticle>;

const articleSchema = new Schema<IArticle, ArticleModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Article: ArticleModel =
  models.Article || model<IArticle, ArticleModel>("Article", articleSchema);

export default Article;
