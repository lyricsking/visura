import { LoaderFunction, json } from "@remix-run/node";
import { Params, createSearchParams, useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import NotFound from "./not-found";
import React, { Suspense, useEffect } from "react";
import { withConfig } from "~/utils/global-loader";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const NOT_FOUND_PATH = "not-found";

export const loader: LoaderFunction = withConfig(async (args, config, app) => {
  const { params, request } = args;
  const url = new URL(request.url);

  const path = url.pathname; // e.g., "/blog/posts/first-post"

  const pluginRoutes = app?.findRoute("app");

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
          route.loader &&
          (await route.loader({ app: app!, params: params as Params }));

        return json({
          data: data,
          params,
          pathname: route.path,
          componentPath: route.file,
        });
      }
    }
  }

  // If no route matched, return 404
  //throw new Response("Not Found", { status: 404 });
  // Return default path
  return json({ pathname: NOT_FOUND_PATH, data: {} });
});

export default function CatchAll() {
  const { pathname, data, params, componentPath } =
    useLoaderData<typeof loader>();


  if (componentPath && pathname !== NOT_FOUND_PATH){
    // Use React.lazy to dynamically import the component
    const DynamicComponent = React.lazy(() =>
      import( /* @vite-ignore */ `../../plugins/${componentPath}`)
    );
    
    return (
      <Suspense fallback={<div>Loading component...</div>}>
        <DynamicComponent {...data} pathname={pathname} />
      </Suspense>
    );
  }

  return <NotFound />;
}
