import mongoose, { Model, Schema } from "mongoose";
import { Field } from "../types/collection";
import { ContentType } from "../models/collection.model.server";

export const typeMap: Record<string, any> = {
  string: String,
  number: Number,
  boolean: Boolean,
  date: Date,
};

/**
 * Converts a string field type to Mmongoose schema type.
 * @param type - The field type as string (e.g. "string", "number").
 * @returns The corresponding Mongoose schema type.
 */
export function convertFieldType(type: string) {
  return typeMap[type] || String; // Default to String if type is unknown
}

type FieldMap = Record<string, any>;

/**
 * Dynamically creates or retrieve a mongoose model for a given content type
 *
 * @param name - The name of the content type (e.g "product")
 * @param fields -  An array of field definitios (e.g [{name: "price", type: "number"}])
 * @returns The Mongoose model for the content type
 */
export function createDynamicModel(name: string, fields: Field[]): Model<any> {
  // Check if the model already exists, return the model
  if (mongoose.models[name]) {
    // Fortunately mongoose provide a cache of mongoose models,
    // we will use that to check
    return mongoose.models[name];
  }

  // Create the schema based on the fields
  const schemaDefinition = fields.reduce((acc, field) => {
    acc[field.name] = {
      type: convertFieldType(field.type),
      required: field.required || false,
    };

    return acc;
  }, {} as FieldMap);

  const schema = new Schema(schemaDefinition);
  const model = mongoose.model(name, schema);

  return model;
}

async function initDynamicModels() {
  // Fetch all content types from database
  const ContentTypes = await ContentType.find();

  ContentTypes.forEach((contentType) => {
    createDynamicModel(contentType.name, contentType.fields);
  });
}
