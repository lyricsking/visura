import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import { findRoute } from "~/actions/route.action";
import NotFound from "./not-found";

const NOT_FOUND_PATH = "not-found";

export const loader: LoaderFunction = async (args) => {
  const { params, request } = args;
  const url = new URL(request.url);
  console.log(url.toString());
  
  const path = url.pathname; // e.g., "/blog/posts/first-post"

  const pluginRoutes = findRoute("app");

  if (pluginRoutes && Array.isArray(pluginRoutes)) {
    // Try matching the URL with the registered plugin paths
    for (let route of pluginRoutes) {
      const matchRoute = match(route.path, { decode: decodeURIComponent });
      const matchResult = matchRoute(path);

      if (matchResult) {
        const { path, params } = matchResult;
        // Do something with the matched params
        // e.g., load the post based on postId
        const data = route.loader && (await route.loader(args));
        return json({ path: route.path, data: data, params });
      }
    }
  }

  // If no route matched, return 404
  //throw new Response("Not Found", { status: 404 });
  // Return default path
  return json({ path: NOT_FOUND_PATH, data: {} });
};

export default function CatchAll() {
  const { path, data, params } = useLoaderData<typeof loader>();
  
  const route = findRoute("app", path);
  
  if (!route || path === NOT_FOUND_PATH)
    return <NotFound />;
  

  if (!Array.isArray(route)) {
    return <route.component {...data} />;
  }

}
