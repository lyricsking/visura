import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { singleton } from "~/utils/singleton";

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  component: React.ElementType;
  loader?: LoaderFunction;
  action?: ActionFunction;
};

const ROUTE_KEY = "routes"
export const routes = singleton<Record<RouteType, Route[]>>(ROUTE_KEY, {
  admin:[],
  app:[]
})

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
  const mRoutes = routes.get()
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

