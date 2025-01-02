import visuraConfig from "visura.config";
import { registerRoute, Route } from "./route";
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
      registerRoute({
        id: route.id,
        metadata: route.metadata,
        path: route.path,
        loaderEnpoint: route.loaderEnpoint,
        actionEnpoint: route.actionEnpoint,
        component: route.component,
      });
    });
  }

  // Handle plugin definition
  return pluginConfig;
}

export type PluginConfigFunction = typeof definePlugin;
