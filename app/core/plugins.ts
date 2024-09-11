import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import config from "~/config";

export interface Plugin {
  name: string;
  description: string;
  version: string;
  init: () => void; // Method to init the plugin
  routes?: (route: DefineRouteFunction) => void;
  headerIcon?: React.ElementType;
}

export const plugins: Plugin[] = [];
// Registers a plugin
export const registerPlugin = (plugin: Plugin) => {
  plugins.push(plugin);
};

/**
 * Checks which plugins are enabled and dynamically imports their default module
 * @returns
 */
export const loadPlugins = async () => {
  for (const [pluginName, pluginConfig] of Object.entries(config.plugins)) {
    if (pluginConfig.enabled) {
      // Dynamiclly import the plugin's routes
      const pluginModule = (await import(`../plugins/${pluginName}/index`))
        .default;
      // Typescript assertion to ensure the plugin implements the Plugin interface
      if (isValidPlugin(pluginModule)) {
        registerPlugin(pluginModule);
      } else {
        console.error(`Plugin "${pluginName}" is not a valid plugin.`);
      }
    }
  }
};

function isValidPlugin(plugin: any): plugin is Plugin {
  return (
    typeof plugin.name === "string" &&
    typeof plugin.init === "function" &&
    typeof plugin.routes === "function"
  );
}
