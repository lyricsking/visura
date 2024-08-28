import { config } from "@/config";
import { IPost } from "../types/post.type";

type PostSummaryProps = {
  post: IPost;
};

export function PostSummary(props: PostSummaryProps) {
  let { post } = props;

  let blogPath = config.blogPath;
  let dateFormat = post.publishedOn.toDateString();

  return (
    <article className="group relative flex flex-col space-y-2">
      <img
        alt={post.title}
        width="804"
        height="452"
        className="rounded-md border bg-muted transition-colors"
        src={post.featuredImage}
      />
      <h2 className="text-2xl font-extrabold">{post.title}</h2>
      <p className="text-muted-foreground">{post.excerpt}</p>
      <p className="text-sm text-muted-foreground">{dateFormat}</p>
      <a className="absolute inset-0" href={`/${blogPath}/${post.slug}`}>
        <span className="sr-only">View Article</span>
      </a>
    </article>
  );
}
