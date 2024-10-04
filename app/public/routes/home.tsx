import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DefaultHome from "./default-home";
import React, { Suspense } from "react";
import { withConfig } from "~/utils/global-loader";

import path from "path";
import { fileURLToPath } from "url";

export const loader: LoaderFunction = withConfig(async (arg, config, app) => {
  const homepagePath = config.homepage;
  const route = app?.findRoute("app", homepagePath);

  console.log("Home", homepagePath);

  if (route && !Array.isArray(route)) {
    const routeData =
      route.loader && (await route.loader({ app: app!, params: arg.params }));

    return json({
      data: routeData,
      pathname: homepagePath,
      componentPath: route.file,
    });
  }

  return json({ data: null, pathname: "default" });
});

export default function Home() {
  const { componentPath, data, pathname } = useLoaderData<typeof loader>();

  // Get the current file's path
  const __filename = fileURLToPath(import.meta.url);
  // Get the current directory name
  const __dirname = path.dirname(__filename);
  // Navigate up to the `app` directory
  const pluginComponentPath = path.resolve(
    __dirname,
    "../../plugins",
    componentPath
  );

  if (componentPath && pathname !== "default") {
    // Use React.lazy to dynamically import the component
    const DynamicComponent = React.lazy(
      () => import(/* @vite-ignore */ pluginComponentPath)
    );

    //return <DynamicComponent {...data} />;

    return (
      <Suspense fallback={<div>Loading component...</div>}>
        <DynamicComponent {...data} />
      </Suspense>
    );
  }

  return <DefaultHome />;
}
