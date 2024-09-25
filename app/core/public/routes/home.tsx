import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findRoute } from "~/actions/route.action";
import config from "~/config";
import DefaultHome from "./default-home";

export const loader = async (arg: LoaderFunctionArgs) => {
  const homepagePath = config.app.homepage;
  const route = findRoute("app", homepagePath);

  if (!route || Array.isArray(route)) {
    return json({ data: null, path: homepagePath });
  }

  const routeData = route.loader && route.loader(arg);

  return json({ data: routeData, path: homepagePath });
};

export default function Home() {
  const { data, path } = useLoaderData<typeof loader>();

  const route = findRoute("app", path);
  if (!path || !route || Array.isArray(route)) {
    return <DefaultHome />;
  }

  const Component = route && route.component;

  return <Component {...data} />;
}
