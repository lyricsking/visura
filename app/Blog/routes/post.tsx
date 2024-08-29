import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Types } from "mongoose";
import Button from "~/components/button";
import { IPost } from "../types/post.type";
import { findPostBySlug, findPosts } from "../server/post.server";

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-3xl mx-auto px-4 md:py-8 md:px-6">
      <div className="p-4">
        <p className="text-gray-500">Published on April 9, 2023</p>
        <h1 className="text-5xl font-bold mt-1">{post.title}</h1>

        <div className="flex items-center mt-4">
          <img
            src="author-image-url"
            alt=" author"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="ml-3">
              <p className="font-semibold">Jamiu</p>
              <p className="text-gray-500">@jamiu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-auto border rounded-lg mb-6"
        />
        {/* Formatted content here */}
        <div
          className="prose md:prose-lg lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["slug"];
  if (!slug) throw Error("Post slug id must be provided.");
  let post = await findPostBySlug({ slug });

  return json({ post });
};
