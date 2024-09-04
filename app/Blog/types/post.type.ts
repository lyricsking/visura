import { Types } from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  author: Types.ObjectId;
  content: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  published: boolean;
  publishedOn: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
