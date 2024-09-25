import { ActionFunction, LoaderFunction } from "@remix-run/node";

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  component: React.ComponentType;
  loader?: LoaderFunction;
  action?: ActionFunction;
};

const routes: Record<RouteType, Route[]> = {
  app: [],
  admin: [],
};

const homePaths: Record<string, string> = {};

export function addRoute(type: RouteType, route: Route) {
  routes[type] = [...routes[type], route];
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
