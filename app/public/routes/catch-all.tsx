import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { match, MatchResult } from "path-to-regexp";
import { getAppContext } from "~/app";
import { IPage, PageContentType } from "~/core/page/types/page";
import { renderPage } from "~/components/ui/render-page";
import { PageModel } from "~/core/page/models/page.model";

const NOT_FOUND_PATH = "not-found";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const path = new URL(request.url).pathname;
  const app = await getAppContext();

  let page;
  let loaderData: any;

  page = await PageModel.findOne({ path: path });
  if (!page) {
    page = app.findRoute(path) as IPage;
  }

  const matchedRoute = app.routes.find((route) => {
    const matchRoute = match(route.path, { decode: decodeURIComponent });
    return matchRoute(path);
  });

  if (matchedRoute) {
    const { path: p, params } = match(matchedRoute.path, {
      decode: decodeURIComponent,
    })(path) as MatchResult<any>;
    const data = matchedRoute.loader
      ? await matchedRoute.loader({ ...args, app })
      : null;

    return json({
      path: matchedRoute.path,
      params: params,
      data,
      content: matchedRoute.content,
    });
  }

  // If no route matched, return default not-found response
  return json({
    data: {},
    path: NOT_FOUND_PATH,
    params: undefined,
    content: null,
  });
};

export default function CatchAll() {
  const { data, path, content } = useLoaderData<typeof loader>();
  if (content) return renderPage(path, content as PageContentType, data);
  return <>Nothing</>;
}
