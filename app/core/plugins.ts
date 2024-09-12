import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import config from "~/config";
import { AppContext } from "./core";

export interface IPlugin {
  name: string;
  description: string;
  version: string;
  routes?: (route: DefineRouteFunction) => void;
  headerIcon?: React.ElementType;
}

export type PluginDefaultExport = (app: AppContext) => void;

/**
 * Checks which plugins are enabled and dynamically imports their default module
 * @returns
 */
export const loadPlugins = async (app: AppContext) => {
  for (const [pluginName, pluginConfig] of Object.entries(config.plugins)) {
    if (pluginConfig.enabled) {
      try {
        // Dynamically import the plugin's default module
        const pluginModule = (await import(`../plugins/${pluginName}/index`)).default;

        // Type assertion to ensure the plugin satisfies PluginDefaultExport
        if (isValidPluginFunction(pluginModule)) {
          pluginModule(app); // Call the plugin with AppContext
        } else {
          console.error(`Plugin "${pluginName}" does not satisfy PluginDefaultExport.`);
        }
      } catch (error) {
        console.error(`Failed to load plugin "${pluginName}":`, error);
      }
    }
  }
};

/**
 * Ensures the plugin's default export matches the PluginDefaultExport type
 */
function isValidPluginFunction(plugin: any): plugin is PluginDefaultExport {
  return typeof plugin === 'function';
}
