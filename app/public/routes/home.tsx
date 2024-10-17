import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DefaultHome from "./default-home";
import { withContext } from "~/utils/context-loader";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { useApp } from "~/hooks/use-app";

export const loader: LoaderFunction = withContext(
  async ({ app, params, request }) => {
    const url = new URL(request.url);
    const homepagePath = app.configs.homepage;
    const route = app?.findRoute("app", homepagePath);

    console.log(homepagePath);

    const data = { data: null, params, pathname: "default" };

    if (route && !Array.isArray(route)) {
      const routeData = route.loader && (await route.loader({ app, params }));
      data["data"] = routeData;
      data["pathname"] = route.path;
    }

    return json(data);
  }
);

export default function Home() {
  const { pathname, data, params } = useLoaderData<typeof loader>();

  const { app } = useApp();
  const route = app?.findRoute("app", pathname);

  if (route && !Array.isArray(route)) {
    const Component = route.component;
    return <Component {...data} />;
  }
  return <DefaultHome />;
}
