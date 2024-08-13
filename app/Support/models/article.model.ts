import mongoose, { Model, Schema, Types, model } from "mongoose";
import { IArticle, IArticleCollection } from "../types/article.type";

// Article Schema
const articleSchema = new Schema<IArticle>({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export type ArticleCollectionModel = Model<IArticleCollection>;

// Support Article Category Schema
const ArticleCollectionSchema = new Schema<
  IArticleCollection,
  ArticleCollectionModel
>({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  articles: { type: [articleSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
const ArticleCollection: ArticleCollectionModel =
  mongoose.models.ArticleCollection ||
  model<IArticleCollection, ArticleCollectionModel>(
    "ArticleCollection",
    ArticleCollectionSchema
  );
export default ArticleCollection;
