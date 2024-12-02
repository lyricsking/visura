import mongoose, { Model, Schema } from "mongoose";
import { Field } from "../types/content";
import { convertFieldType } from "./convert-field-type";

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
  const schemaDefinition: Record<string, any> = {};
  fields.forEach((field) => {
    schemaDefinition[field.name] = {
      type: convertFieldType(field.type),
      required: field.required || false,
    };
  });

  const schema = new Schema(schemaDefinition);
  const model = mongoose.model(name, schema);

  return model;
}
