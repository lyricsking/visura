import { PluginLoaderFunction } from "~/core/types/route";
import { findPosts } from "../server/post.server";
import { findTips } from "../server/tips.server";

export const blogLoader: PluginLoaderFunction = async () => {
  const [tips, posts] = await Promise.all([
    findTips(),
    findPosts({ published: true }),
  ]);

  return { tips, posts };
};