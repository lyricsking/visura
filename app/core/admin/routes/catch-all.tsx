import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import { Route, findRoute } from "~/actions/route.action";

export const loader: LoaderFunction = async (args) => {
  const { params, request } = args;

  const url = new URL(request.url);
  const path = url.pathname; // e.g., "/blog/posts/first-post"

  const pluginRoutes = findRoute("app") as Route[];
  if (pluginRoutes && Array.isArray(pluginRoutes)) {
    // Try matching the URL with the registered plugin paths
    for (const route of pluginRoutes) {
      const matchRoute = match(route.path, { decode: decodeURIComponent });
      const matchResult = matchRoute(path);

      if (matchResult) {
        const { path, params } = matchResult;
        // Do something with the matched params
        // e.g., load the post based on postId
        const data = route.loader && (await route.loader(args));
        return { path: route.path, data: data, params };
      }
    }
  }

  // If no route matched, return 404
  //throw new Response("Not Found", { status: 404 });
  // Return default path
  return { path: "not-found", data: {} };
};

export default function CatchAll() {
  const { path, data, params } = useLoaderData<typeof loader>();

  const route = findRoute("app", path);

  return route && !Array.isArray(route) ? (
    <route.component {...data} />
  ) : (
    <p>No route matched</p>
  );
}
