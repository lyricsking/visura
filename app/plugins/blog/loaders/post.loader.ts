import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { findPostBySlug } from "../server/post.server";
import { PluginLoaderFunction } from "~/actions/route.action";

export const loader: PluginLoaderFunction = async ({ params }) => {
  let slug = params["slug"];
  if (!slug) throw Error("Post slug id must be provided.");

  let post = await findPostBySlug({ slug });

  if (!post) throw Error("No post was found.");

  return { post };
};
