import renderBlock from "~/core/components/ui/block";
import { PageContentType } from "~/core/types/page";
import { useAppContext } from "~/core/utils/app-context";
import Loading from "../loading";

export const renderPage = (
  path: string,
  content: PageContentType,
  data?: any
) => {
  switch (content.type) {
    case "block":
      return renderBlock(content.value);
    case "markdown":
      return "Not yet implemented";
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
