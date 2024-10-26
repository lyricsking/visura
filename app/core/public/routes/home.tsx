import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IPage, PageContentType, PageMetadata } from "~/core/types/page";
import { renderPage } from "~/core/components/ui/render-page";
import Loading from "~/core/components/loading";
import { getAppContext } from "~/app";
import { useAppContext } from "~/core/utils/app-context";
import { PageModel } from "~/core/models/page.model";
import Page from "~/core/components/ui/page";

export const loader = async (args: LoaderFunctionArgs) => {
  const app = await getAppContext();

  let page: IPage;
  let loaderData: any;
  const homepage = app.homepage;
  if (homepage.type === "custom" && homepage.pageId) {
    page = (await PageModel.findOne(homepage.pageId)) as IPage;
  } else if (homepage.type === "plugin" && homepage.path) {
    page = app.findRoute(homepage.path);
    loaderData = page.loader && page.loader({ ...args, app });
  } else {
    throw new Error("Homepage improperly configured.");
  }

  return json({ path: page.path, data: loaderData, content: page.content });
};

export default function Home() {
  const { data, path, content } = useLoaderData<typeof loader>();
  return renderPage(path, content as PageContentType, data);
}
