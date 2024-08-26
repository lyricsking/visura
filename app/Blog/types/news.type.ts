import { Types } from "mongoose";

export interface News {
  _id: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  content: string;
  exercpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}
