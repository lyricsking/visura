import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DefaultHome from "./default-home";
import React, { Suspense, createElement, useEffect } from "react";
import { withContext } from "~/utils/context-loader";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

export const loader: LoaderFunction = withContext(
  async ({ app, params, request }) => {
    const url = new URL(request.url);
    const homepagePath = app.configs.homepage;
    const route = app?.findRoute("app", homepagePath);

    console.log(homepagePath);

    if (route && !Array.isArray(route)) {
      const routeData = route.loader && (await route.loader({ app, params }));

      const MyComponent = (
        await import(/* @vite-ignore */ `/app/${route.component}`)
      ).default;

      return json({
        data: routeData,
        params,
        pathname: route.path,
        //componentPath: route.component,
        componentPath: renderToString(
          <StaticRouter location={url.pathname}>
            <MyComponent {...routeData} />
          </StaticRouter>
        ),
      });
    }

    return json({ data: null, pathname: "default" });
  }
);

export default function Home() {
  const { pathname, data, params, componentPath } =
    useLoaderData<typeof loader>();
  console.log(componentPath);

  return componentPath ? (
    <div dangerouslySetInnerHTML={{ __html: componentPath }} />
  ) : (
    <DefaultHome />
  );
}
