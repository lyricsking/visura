import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IPage, PageContentType } from "~/core/types/page";
import { renderPage } from "~/core/components/ui/render-page";
import { getAppContext } from "~/app";
import { PageModel } from "~/core/models/page.model";

export const loader = async (args: LoaderFunctionArgs) => {
  const app = await getAppContext();

  let page: IPage | undefined;
  let loaderData: any;
  const homepage = app.homepage;
  if (homepage.type === "custom" && homepage.path) {
    page = (await PageModel.findOne({ path: homepage.path })) as IPage;
  } else if (homepage.type === "plugin" && homepage.path) {
    page = app.findRoute(homepage.path);
    loaderData = page?.loader && page.loader({ ...args, app });
  } else {
    throw new Error("Homepage improperly configured.");
  }

  return json({
    path: homepage.path,
    data: loaderData,
    content: page?.content,
  });
};

export default function Home() {
  const { data, path, content } = useLoaderData<typeof loader>();
  return renderPage(path, content as PageContentType, data);
}
