import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IPage, PageContentType, PageMetadata } from "~/core/types/page";
import { renderPage } from "~/core/components/ui/render-page";
import { Route } from "~/core/types/route";
import Loading from "~/core/components/loading";
import { getAppContext } from "~/app";
import { useAppContext } from "~/core/utils/app-context";
import { PageModel } from "~/core/models/page.model";

export const loader = async (args: LoaderFunctionArgs) => {
  const app = await getAppContext();

  let page: IPage;
  const homepage = app.homepage;
  if (homepage.type === "custom" && homepage.pageId) {
    page = (await PageModel.findOne(homepage.pageId)) as IPage;
  } else if (homepage.type === "plugin" && homepage.path) {
    page = app.findRoute("app", homepage.path);
  } else {
    throw new Error("Homepage improperly configured.");
  }

  let data: {
    path: string;
    data: any;
    metadata: PageMetadata | undefined;
    content: PageContentType[];
  } = {
    path: page.path,
    data: undefined,
    metadata: page.metadata,
    content: page.content,
  };

  // if (route && !Array.isArray(route)) {
  //   data.path = route.path;
  //   // data.data = route.loader && route.loader({ ...args, app });
  //   data.metadata = route.page.metadata;
  // }
};

export default function Home() {
  const { data, path } = useLoaderData<typeof loader>();

  const app = useAppContext();

  const route = app.findRoute("app", path);

  const pageContents = route.content;
  if (route && pageContents) {
    for (const content of pageContents) {
      return renderPage(content, data);
    }
  }

  return <Loading />;
}
