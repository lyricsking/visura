import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Params, useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import NotFound from "./not-found";
import React, { Suspense, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { app } from "~/entry.server";

const NOT_FOUND_PATH = "not-found";

export const loader = async ({ request }: LoaderFunctionArgs) => {
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
        const data = route.loader && (await route.loader());

        return json({
          data: data,
          params,
          pathname: route.path,
          //componentPath: route.component,
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
  const { pathname } = useLoaderData<typeof loader>();

  // useEffect(() => {
  //   alert(componentPath);
  // }, []);

  // return <div dangerouslySetInnerHTML={{ __html: componentPath }} />;
  // if (componentPath && pathname !== NOT_FOUND_PATH) {
  //   // Use React.lazy to dynamically import the component
  //   const DynamicComponent = React.lazy(
  //     () => import(/* @vite-ignore */ `/app/${componentPath}`)
  //   );

  //   return (
  //     <Suspense fallback={<div>Loading component...</div>}>
  //       <DynamicComponent {...data} pathname={pathname} />
  //     </Suspense>
  //   );
  // }

  return <NotFound />;
}
