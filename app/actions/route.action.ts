import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { singleton } from "~/utils/singleton";

export type PluginLoaderFunctionArgs = {
  params: Params;
};

export type PluginLoaderFunction = (args: PluginLoaderFunctionArgs) => any;

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  /**
   * The path to the file that exports the React component rendered by this
   * route as its default export, relative to the `app` directory.
   */
  file: string;
  loader?: PluginLoaderFunction;
  action?: ActionFunction;
};

const ROUTE_KEY = "routes";
export const routes = singleton<Record<RouteType, Route[]>>(ROUTE_KEY, {
  admin: [],
  app: [],
});

const homePaths: Record<string, string> = {};

export function addRoute(type: RouteType, route: Route) {
  const mRoutes = routes.get();
  if (mRoutes) {
    mRoutes[type] = [...mRoutes[type], route];
    routes.set(mRoutes);
  }
}

export function findRoute(
  type: RouteType,
  path?: string
): undefined | Route | Route[] {
  const mRoutes = routes.get();
  if (mRoutes) {
    const typeRoutes = mRoutes[type];

    if (!typeRoutes) return undefined;

    if (!path) return typeRoutes;

    return typeRoutes.find((route) => route.path === path);
  }

  return undefined;
}

export function addHomepagePath(name: string, path: string) {
  if (!homePaths[name]) {
    homePaths[name] = path;
  }
}
