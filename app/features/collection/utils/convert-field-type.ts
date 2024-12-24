import { boolean, string } from "zod";

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
