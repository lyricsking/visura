import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { findPostBySlug } from "../server/post.server";

export const loader: LoaderFunction= async ({ params }) => {
  let slug = params["slug"];
  if (!slug) throw Error("Post slug id must be provided.");

  let post = await findPostBySlug({ slug });
  console.log(post);

  if (!post) throw Error("No post was found with such.");

  return { post };
};
