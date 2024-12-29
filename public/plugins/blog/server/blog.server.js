"use strict";
import { json } from "@remix-run/node";
import { findPosts, publishPost } from "./post.server";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const action2 = formData.get("action");
  if (action2 === "publish") {
    const id = formData.get("id");
    if (id) {
      console.log(await publishPost(id));
    }
    return json({ success: true });
  }
};
export const loader = (app) => {
  return async () => {
    const posts = await findPosts({});
    return posts;
  };
};
//# sourceMappingURL=blog.server.js.map
