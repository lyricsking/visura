import renderBlock from "~/core/components/ui/block";
import { PageContent } from "~/core/types/page";

export const renderPage = (content: PageContent, data?: any) => {
  switch (content.type) {
    case "block":
      return renderBlock(content.value);
    case "markdown":
      return "Not yet implemented";
    case "component":
      const Tag = content.value;
      return <Tag {...data} />;
    default:
      break;
  }
};
