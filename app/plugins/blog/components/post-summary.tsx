import config from "@/config";
import { formatDateOrTime } from "~/utils/date";
import { Link } from "@remix-run/react";
import { blogPath } from "..";
import { useEffect } from "react";

type PostSummaryProps = {
  post: any;
};

export function PostSummary(props: PostSummaryProps) {
  let { post } = props;

  let path = config.plugins["blog"].settings.path || blogPath;
  let dateFormat = post.publishedOn
    ? formatDateOrTime(new Date(post.publishedOn), {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group relative flex flex-col space-y-2">
      <img
        alt={post.title}
        width="804"
        height="452"
        className="rounded-md border bg-muted transition-colors"
        src={"/images/post/" + post.featuredImage}
      />
      <h2 className="text-2xl font-extrabold">{post.title}</h2>
      <p className="text-muted-foreground">{post.excerpt}</p>
      <p className="text-sm text-muted-foreground">{dateFormat ?? null}</p>
      <Link className="absolute inset-0" to={`/${post.slug}`}>
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
}
