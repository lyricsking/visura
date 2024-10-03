import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { singleton } from "~/utils/singleton";
import z from "zod"
export type PluginLoaderFunctionArgs = {
  params: Params;
};

export type PluginLoaderFunction = (args: PluginLoaderFunctionArgs) => any;

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  file: string;
  loader?: PluginLoaderFunction;
  action?: ActionFunction;
};

const ROUTE_KEY = "routes";
export const routes = singleton<Record<RouteType, Route[]>>(ROUTE_KEY, {
  app: [],
  admin: [],
});

const homePaths: Record<string, string> = {};

export function addRoute(type: RouteType, route: Route) {
  const mRoutes = routes;
  if (mRoutes) {
    mRoutes[type] = [...mRoutes[type], route];
  }
}

export function findRoute(
  type: RouteType,
  path?: string
): undefined | Route | Route[] {
  const mRoutes = routes;
  if (mRoutes) {
    const typeRoutes = mRoutes [type];

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
