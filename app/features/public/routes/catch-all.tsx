import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { match, MatchResult } from "path-to-regexp";
import { getAppContext } from "~/app";
import { IPage, PageContent } from "~/features/page/types/page";
import { renderPage } from "~/shared/components/ui/render-page";
import { PageModel } from "~/features/page/models/page.server";

const NOT_FOUND_PATH = "not-found";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  let path = new URL(request.url).pathname || NOT_FOUND_PATH;
  const app = await getAppContext();

  let page;
  let loaderData: any;
  let params: any;

  page = await PageModel.findOne({ path: path });
  if (!page) {
    // page = app.findRoute(path) as IPage;

    page = app.pluginRoutes.find((route) => {
      const matchRoute = match(route.path, { decode: decodeURIComponent });
      return matchRoute(path);
    });

    if (page) {
      const matchedData = match(page.path, {
        decode: decodeURIComponent,
      })(path) as MatchResult<any>;
      params = matchedData.params;
      path = matchedData.path;
      loaderData = page.loader ? await page.loader({ ...args, app }) : null;
    }
  }

  return json({
    path: path,
    params: params,
    data: loaderData,
    content: page?.content,
  });
};

export default function CatchAll() {
  const { data, path, content } = useLoaderData<typeof loader>();
  if (content) return renderPage(path, content as PageContent, data);
  return <>Nothing</>;
}
