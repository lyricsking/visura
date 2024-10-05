import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DefaultHome from "./default-home";
import React, { Suspense } from "react";
import { withContext } from "~/utils/context-loader";

export const loader: LoaderFunction = withContext(async (arg, config, app) => {
  const homepagePath = config.homepage;
  const route = app?.findRoute("app", homepagePath);

  console.log("Home", homepagePath);

  if (route && !Array.isArray(route)) {
    const routeData =
      route.loader && (await route.loader({ app: app!, params: arg.params }));

    return json({
      data: routeData,
      pathname: homepagePath,
      componentPath: route.component,
    });
  }

  return json({ data: null, pathname: "default" });
});

export default function Home() {
  const { componentPath, data, pathname } = useLoaderData<typeof loader>();

  if (componentPath && pathname !== "default") {
    // Use React.lazy to dynamically import the component
    const DynamicComponent = React.lazy(
      () => import(/* @vite-ignore */ `/app/${componentPath}`)
    );

    return (
      <Suspense fallback={<div>Loading component...</div>}>
        <DynamicComponent {...data} />
      </Suspense>
    );
  }

  return <DefaultHome />;
}
