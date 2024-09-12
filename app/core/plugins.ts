import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import config from "~/config";
import { AppContext } from "./core";

export interface IPlugin {
  name: string;
  description: string;
  version: string;
  init: (app: AppContext) => void; // Method to init the plugin
  routes?: (route: DefineRouteFunction) => void;
  headerIcon?: React.ElementType;
}

/**
 * Checks which plugins are enabled and dynamically imports their default module
 * @returns
 */
export const loadPlugins = async (app: AppContext) => {
  for (const [pluginName, pluginConfig] of Object.entries(config.plugins)) {
    if (pluginConfig.enabled) {
      // Dynamiclly import the plugin's routes
      const pluginModule = (await import(`../plugins/${pluginName}/index`))
        .default;
      // Typescript assertion to ensure the plugin implements the Plugin interface
      if (isValidPlugin(pluginModule)) {
        pluginModule(app)
      } else {
        console.error(`Plugin "${pluginName}" is not a valid plugin.`);
      }
    }
  }
};

function isValidPlugin(plugin: any): plugin is IPlugin {
  return (
    typeof plugin.name === "string" &&
    typeof plugin.init === "function" &&
    typeof plugin.routes === "function"
  );
}

