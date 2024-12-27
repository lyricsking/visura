const generateSchema = (contentType, fields) => {
  const processField = (field) => {
    const { id, fields: nestedFields, ...rest } = field; // Exclude temporary ID
    if (nestedFields) {
      return { ...rest, fields: nestedFields.map(processField) };
    }
    return rest;
  };

  return {
    name: contentType.name,
    description: contentType.description,
    fields: fields.map(processField),
  };
};
