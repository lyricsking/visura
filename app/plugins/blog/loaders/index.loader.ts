import {
  PluginLoaderFunction,
  PluginLoaderFunctionArgs,
} from "~/actions/route.action";
import { findPosts } from "../server/post.server";
import { findTips } from "../server/tips.server";

export const blogLoader = async ({ app }: PluginLoaderFunctionArgs) => {
  const [tips, posts] = await Promise.all([
    findTips(),
    findPosts({ published: true }),
  ]);

  return { app, tips, posts };
};
