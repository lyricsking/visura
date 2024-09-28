import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findRoute } from "~/actions/route.action";
import config from "~/config";
import DefaultHome from "./default-home";
import React, { Suspense } from "react";

export const loader:LoaderFunction = async (arg) => {
  const homepagePath = config.app.homepage;
  const route = findRoute("app", homepagePath);

  console.log(homepagePath);
  
  if (route && !Array.isArray(route)) {
    const routeData = route.loader && (await route.loader(arg));

    return json({
      data: routeData,
      path: homepagePath,
      filePath: route.file
    });
  }

  return json({ data: null, path: "default" });
};

export default function Home() {
  const { path, data, filePath } = useLoaderData<typeof loader>();

  if (!filePath || path === "default") return <DefaultHome />;

  // Use React.lazy to dynamically import the component
  const DynamicComponent = React.lazy(
    () => import(`../../../plugins/` + filePath)
  );

  //return <DynamicComponent {...data} />;

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <DynamicComponent {...data} />
    </Suspense>
  );
}
