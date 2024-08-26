import mongoose, { Schema, model, Types } from "mongoose";

export type NewsModelType = Model<INews>
// Define the schema for the News model
const newsSchema = new Schema<INews, NewsModelType>({
  title: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String, required: true },
  tags: { type: [String], required: true },
  publishedOn: { type: Date, required: true }
});

// Create the News model
const NewsModel: NewsModelType = mongoose.models.News | mongoose.model("News", newsSchema);

export default NewsModel;
