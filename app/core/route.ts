import { ComponentType } from "react";
import visuraConfig from "visura.config";
import { serverOnly$ } from "vite-env-only/macros";
import { RouteAlias } from "~/backend/models/route-alias";
import { PluginConfig } from "~/core/plugin";
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
  component: ComponentType<any>;
};

const routeRegistry: Route[] = [];

export const routeAliases: Record<string, string> = {
  // Example Route ID -> User-configured path
};

export async function loadRouteAliases() {
  const aliases = await serverOnly$(RouteAlias.find().lean());
  aliases?.forEach(({ _id, path }) => {
    routeAliases[_id] = path;
  });
}

export function registerRoute(route: Route) {
  routeRegistry.push(route);
}

export function getRoutes(plugins:PluginConfig[]): Route[] {
  return plugins.flatMap<Route>((plugin) =>
    (plugin.routes || []).map<Route>((route) => ({
      ...route,
      path: routeAliases[route.id] || route.path, // Use alias route if available
    }))
  );
}
