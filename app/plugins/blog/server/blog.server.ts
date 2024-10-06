import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { findPosts, publishPost } from "./post.server";
import { PluginLoaderFunctionArgs } from "~/actions/route.action";

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

export const loader = async ({}: PluginLoaderFunctionArgs) => {
  const posts = await findPosts({});

  return { posts };
};
