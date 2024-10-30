import slugify from "slugify";
import { getNanoid } from "~/core/utils/util";

export const getSlug = (text: string) => {
  let slug = slugify(text, {
    lower: true, // to lowercase
    strict: true, // Remove special chracters
  });

  let id = getNanoid(6);

  return `${slug}-${id}`;
};
