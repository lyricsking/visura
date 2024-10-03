import { LoaderFunction, json } from "@remix-run/node";
import { Params, createSearchParams, useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import { findRoute, routes } from "~/actions/route.action";
import NotFound from "./not-found";
import React, { Suspense, useEffect } from "react";

const NOT_FOUND_PATH = "not-found";

export const loader: LoaderFunction = async (args) => {
  const { params, request } = args;
  const url = new URL(request.url);

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
        const data =
          route.loader && (await route.loader({ params: params as Params }));
        return json({
          path: route.path,
          data: data,
          params,
          componentPath: route.file,
        });
      }
    }
  }

  // If no route matched, return 404
  //throw new Response("Not Found", { status: 404 });
  // Return default path
  return json({ pathname: NOT_FOUND_PATH, data: {} });
};

export default function CatchAll() {
  const { pathname, data, params, componentPath } = useLoaderData<typeof loader>();
  
  // Get the current file's path
  const __filename = fileURLToPath(import.meta.url);
  // Get the current directory name
  const __dirname = path.dirname(__filename);
  // Navigate up to the `app` directory
  const pluginComponentPath = path.resolve(__dirname, "../../../plugins", componentPath);

  if (!componentPath || pathname === NOT_FOUND_PATH) return <NotFound />;

  // Use React.lazy to dynamically import the component
  const DynamicComponent = React.lazy(
    () => import(/* @vite-ignore */pluginComponentPath)
  );

  //return <DynamicComponent {...data} />;

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <DynamicComponent {...data} />
    </Suspense>
  );
}
