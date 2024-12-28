"use strict";
import { json } from "@remix-run/node";
import { getAuthUser } from "~/core/auth/server/auth.server";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { createPost } from "./post.server";
import { Types } from "mongoose";
import { parseError } from "~/shared/utils/mongoose";
export const action = async ({ request }) => {
  let authUser = await getAuthUser(request);
  if (!authUser || !authUser.id) {
  }
  const formData = await request.formData();
  const formObject = formDataToObject(formData);
  console.log(Object.fromEntries(formData));
  let response = await createPost({
    ...formObject,
    author: new Types.ObjectId(),
    published: false
  });
  if (response.error) {
    const values = Object.fromEntries(formData);
    let errors = parseError(response.error);
    return json({ errors, values });
  }
  return json({ post: response.data });
};
export const loader = () => {
  return async () => {
  };
};
//# sourceMappingURL=edit.server.js.map
