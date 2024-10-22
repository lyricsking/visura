import { LoaderFunction, json } from "@remix-run/node";
import { Params, useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import React, { Suspense, useEffect } from "react";
import NotFound from "~/core/public/routes/not-found";
import { withContext } from "~/core/utils/context-loader";

const NOT_FOUND_PATH = "not-found";

export const handle = {
  pageName: (data: any) => "CatchAll",
  breadcrumb: {
    id: "dashboard",
    label: "CatchAll",
    path: "/dashboard",
  },
};

export const loader: LoaderFunction = withContext(async ({ app, request }) => {
  const url = new URL(request.url);

  const path = url.pathname; // e.g., "/blog/posts/first-post"

  const pluginRoutes = app?.findRoute("admin");

  if (pluginRoutes && Array.isArray(pluginRoutes)) {
    // Try matching the URL with the registered plugin paths
    for (let route of pluginRoutes) {
      const matchRoute = match(route.path, { decode: decodeURIComponent });
      const matchResult = matchRoute(path);

      if (matchResult) {
        const { path, params } = matchResult;

        const routeMenu = app.getRouteMenu(route.path);

        // Do something with the matched params
        // e.g., load the post based on postId
        const data =
          route.loader &&
          (await route.loader({ app: app!, params: params as Params }));

        return json({
          data: data,
          params,
          pathname: route.path,
          componentPath: route.component,
          routeMenu: routeMenu,
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

  if (componentPath && pathname !== NOT_FOUND_PATH) {
    // Use React.lazy to dynamically import the component
    const DynamicComponent = React.lazy(
      () => import(/* @vite-ignore */ `/app/${componentPath}`)
    );

    return (
      <Suspense fallback={<div>Loading component...</div>}>
        <DynamicComponent {...data} pathname={pathname} />
      </Suspense>
    );
  }

  return <NotFound />;
}
