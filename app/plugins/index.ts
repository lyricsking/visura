import config from "../config";
import type { AppContext } from "../core/app";
import type { PluginInitializer } from "../core/declarations";

/**
 * Checks which plugins are enabled and dynamically loads them
 * @returns
 */
export const plugins = async (app: AppContext) => {
  for (const [pluginName, pluginConfig] of Object.entries(config.plugins)) {
    if (pluginConfig.enabled) {
      try {
        // Dynamically import the plugin's default module
        const pluginModule = (await import(`./${pluginName}/index.ts`)).default;

        // Type assertion to ensure the plugin satisfies PluginDefaultExport
        if (isValidPluginInitializer(pluginModule)) {
          pluginModule(app); // Call the plugin with AppContext
        } else {
          console.error(
            `Plugin "${pluginName}" does not satisfy PluginDefaultExport.`
          );
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
function isValidPluginInitializer(plugin: any): plugin is PluginInitializer {
  return typeof plugin === "function";
}
