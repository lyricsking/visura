"use strict";
import { json } from "@remix-run/node";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { createPost } from "./post.server";
import { Types } from "mongoose";
import { isAuthenticated } from "~/shared/auth/server/auth.server";
export const action = async ({ request }) => {
  let authUser = await isAuthenticated(request);
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
  }
  return json({ post: response.data });
};
