const validateData = (schema, data) => {
  for (const field of schema.fields) {
    if (field.required && !(field.label in data)) {
      throw new Error(`Missing required field: ${field.label}`);
    }
    if (field.type === "Object") {
      validateData(field, data[field.label]);
    }
    if (field.type === "Array") {
      data[field.label].forEach((item) => validateData(field, item));
    }
  }
};
