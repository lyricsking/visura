import { IContentType } from "../types/collection";
import { TextInput } from "@mantine/core";

function generateForm(schema: IContentType) {
  return Object.entries(schema.fields).map(([fieldName, option]) => {

    const { type, required } = option;

    switch (type) {
      case "string": {
        return (
          <TextInput
            label={option.name}
            type="text"
            required={option.required}
          />
        );
      }

      default:
        return (
          <TextInput
            label={option.name}
            type="text"
            required={option.required}
          />
        );
    }
  });
}

export function validateForm(schema: Omit<IContentType, "_id">, formData: any) {
  const errors: string[] = [];

  Object.entries(schema.fields).forEach(([fieldName, option]) => {
    const { name, type, required } = option;
    const value = formData[name];

    if (required && !value) {
      errors.push(`${option.name}  is required`);
    }

    if (type === "number" && typeof value !== "number") {
      errors.push(`${option.name} must be a valid number.`);
    }
  });

  return errors;
}
