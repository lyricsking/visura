"use strict";
import slugify from "slugify";
import { getNanoid } from "~/shared/utils/util";
export const getSlug = (text) => {
  let slug = slugify(text, {
    lower: true,
    // to lowercase
    strict: true
    // Remove special chracters
  });
  let id = getNanoid(6);
  return `${slug}-${id}`;
};
//# sourceMappingURL=slug.js.map
