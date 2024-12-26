import render from "~/shared/components/ui/render";
import { useAppContext } from "~/shared/providers/app.provider.tsx";
import Loading from "../loading";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { preview } from "vite";
import { customMarkdownParser } from "~/shared/utils/markdown-utils";
import { PageContentType } from "~/features/page/types/page";

export const renderPage = (
  path: string,
  content: PageContentType,
  data?: any
) => {
  switch (content.type) {
    case "block":
      return render(content.value);
    case "markdown":
      return (
        <div className="prose md:prose-lg lg:prose-xl ">
          {/* Preview */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {customMarkdownParser(content.value)}
          </ReactMarkdown>
        </div>
      );
    case "component":
      const app = useAppContext();
      const route = app.findRoute(path);
      if (route) {
        const Tag = route.content.value;
        return <Tag {...data} />;
      }
    default:
      return <Loading />;
  }
};
