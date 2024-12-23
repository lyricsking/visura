import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { findPostBySlug } from "../server/post.server";
import { PluginLoaderFunction } from "~/app";

export const loader: PluginLoaderFunction = () => {
  return async ({ params }) => {
    let slug = params["slug"];
    if (!slug) throw Error("Post slug id must be provided.");

    let post = await findPostBySlug({ slug });

    if (!post) throw Error("No post was found.");

    return { post };
  };
};
