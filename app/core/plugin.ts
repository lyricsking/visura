import type { Route } from "~/core/route";
import * as routeModule from "~/core/route";
import { Widget } from "./widget";

export interface PluginConfig {
  name: string;
  description: string;
  version: string;
  widgets?: Array<Widget>;
  tools?: Array<any>;
  routes?: Array<Route>;
}

export function definePlugin(pluginConfig: PluginConfig) {
  if (pluginConfig) {

    pluginConfig.routes?.forEach((route) => {
      // routeModule.registerRoute({
      //   id: route.id,
      //   path: route.path,
      //   metadata: route.metadata,
      //   // loaderEnpoint: route.loaderEnpoint,
      //   // actionEnpoint: route.actionEnpoint,
      //   component: route.component,
      // });
    });
  }

  // Handle plugin definition
  return pluginConfig;
}

export type PluginConfigFunction = typeof definePlugin;
