import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { singleton } from "~/utils/singleton";

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  component: React.ElementType;
  loader?: LoaderFunction;
  action?: ActionFunction;
};

export const routes = singleton<Record<RouteType, Route[]>>(
  "routes", {
    app: [],
    admin: []
  }
)!;

const homePaths: Record<string, string> = {};

export function addRoute(type: RouteType, route: Route) {
  const mRoutes = routes
  mRoutes[type] = [...routes[type], route];
}

export function findRoute(
  type: RouteType,
  path?: string
): undefined | Route | Route[] {
  const typeRoutes = routes[type];

  if (!typeRoutes) return undefined;

  if (!path) return typeRoutes;

  return typeRoutes.find((route) => route.path === path);
}

export function addHomepagePath(name: string, path: string) {
  if (!homePaths[name]) {
    homePaths[name] = path;
  }
}

