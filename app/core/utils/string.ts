import slugify from "slugify";

// Utility function to capitalize the string
export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ");

export const getSlug = (text: string) => {
  let slug = slugify(text, {
    lower: true, // to lowercase
    strict: true, // Remove special chracters
  });
  return slug;
};
