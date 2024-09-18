import { Schema, Types } from "mongoose";

export interface IArticle {
  _id: Types.ObjectId;
  title: string;
  description: string;
}

export interface IArticleCollection {
  _id: Types.ObjectId;
  name: string;
  description: string;
  articles: IArticle[];
  createdAt: Date;
  updatedAt: Date;
}
