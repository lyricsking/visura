import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import { formatDateOrTime } from "~/core/utils/date";
import { loader } from "../loaders/post.loader";

export default function Post({ post }: ReturnType<typeof loader>) {
  let publishedOn = post.publishedOn
    ? formatDateOrTime(new Date(post.publishedOn), {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="max-w-3xl mx-auto px-4 md:py-8 md:px-6">
      <div className="p-4">
        {publishedOn && (
          <p className="text-gray-500">Published on {publishedOn}</p>
        )}
        <h1 className="text-5xl break-words font-bold mt-1">{post.title}</h1>
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
        <div className="prose md:prose-lg lg:prose-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
