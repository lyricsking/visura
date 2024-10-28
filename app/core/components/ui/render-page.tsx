import renderBlock from "~/core/components/ui/block";
import { PageContentType } from "~/core/pages/types/page";
import { useAppContext } from "~/core/utils/app-context";
import Loading from "../loading";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { preview } from "vite";
import { customMarkdownParser } from "~/core/utils/markdown-utils";

export const renderPage = (
  path: string,
  content: PageContentType,
  data?: any
) => {
  switch (content.type) {
    case "block":
      return renderBlock(content.value);
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
