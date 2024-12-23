import { ActionFunctionArgs, LoaderFunctionArgs, json } from "react-router";
import { findPosts, publishPost } from "./post.server";
import AppContext, { PluginLoaderFunction } from "~/app";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "publish") {
    const id = formData.get("id");
    if (id) {
      console.log(await publishPost(id as string));
    }
    return json({ success: true });
  }
};

export const loader: PluginLoaderFunction = (app: AppContext) => {
  return async () => {
    const posts = await findPosts({});

    return posts;
  };
};
