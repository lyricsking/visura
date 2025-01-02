import { ComponentType } from "react";
import visuraConfig from "visura.config";
import { PageMetadata } from "~/core/types/page";

interface MetaTags {
  property: string;
  content: string;
}

export interface RouteMetadata {
  title: string;
  description?: string;
  keywords?: string;
  openTags?: Array<MetaTags>;
}

export type Route = {
  id: string;
  path: string;
  metadata: PageMetadata;
  loaderEnpoint?: string;
  actionEnpoint?: string;
  component: ComponentType;
};

const routeRegistry: Route[] = [];

export const routeAliases: Record<string, string> = {
  // Example Route ID -> User-configured path
};

export function registerRoute(route: Route) {
  routeRegistry.push(route);
}

export function getRoutes(): Route[] {
  return visuraConfig.plugins.flatMap<Route>((plugin) =>
    (plugin.routes || []).map<Route>((route) => ({
      ...route,
      path: routeAliases[route.id] || route.path, // Use alias route if available
    }))
  );
}
