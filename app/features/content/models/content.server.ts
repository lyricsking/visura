import mongoose, { Model, Schema } from "mongoose";
import { IContentType } from "../types/content";

type ContentTypeModel = Model<IContentType>;

const contentTypeSchema = new Schema<IContentType, ContentTypeModel>({
  name: { type: String, required: true, unique: true },
  modelName: { type: String, required: true, unique: true },
  fields: [
    {
      name: { type: String, required: true }, // Field name
      title: { type: String, required: true }, //  Field label
      type: { type: String, required: true }, // Field type
      required: { type: Boolean, default: false }, // Is this field required?
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Creates a ContentType collection in which each document represents a custom model
 */
export const ContentType: ContentTypeModel =
  mongoose.models.ContentType ||
  mongoose.model<IContentType, ContentTypeModel>(
    "ContentType",
    contentTypeSchema
  );
