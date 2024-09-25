import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config";

export interface IPlugin {
  name: string;
  description: string;
  version: string;
  settings?: Record<string, any>;
  onInit?: () => void;
  onDestroy?: () => void;
  layoutComponent?: React.ComponentType;
}

export const plugins: { [key: string]: IPlugin } = {};

export const loadPlugins = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pluginDir = path.join(__dirname, "plugins");
    //const pluginDir = __dirname;
    // Read the plugins directory synchronously
    const pluginFolders = fs.readdirSync(pluginDir);

    const pluginsConfig = config.plugins;

    // Filter and load only directories containing an index.ts file
    pluginFolders.forEach(async (pluginFolder) => {
      const pluginPath = path.join(pluginDir, pluginFolder, "index.ts");

      try {
        // Synchronously load the plugin using dynamic import
        const plugin: IPlugin = (await import(pluginPath)).default;

        console.log(`Loading plugin: ${plugin.name}.`);

        if (
          !plugin.name ||
          !plugin.version ||
          typeof plugin.onInit !== "function"
        ) {
          throw new Error(
            `Invalid plugin: ${plugin.name}. Must have a name, version, and init function.`
          );
        }
        // Ensure plugin names are unique
        if (plugins[plugin.name]) {
          throw new Error(`Duplicate plugin name detected: ${plugin.name}`);
        }
        // Cache plugin to memory
        plugins[plugin.name] = plugin;
        // Initialize plugin only if it is enabled.
        if (pluginsConfig[plugin.name]) {
          console.log(`Initializing plugin: ${plugin.name}`);
          plugin.onInit();

          console.log(`Plugin: ${plugin.name} initialized`);
        }
        console.log(`Plugin ${plugin.name} loaded.`);
      } catch (err) {
        console.error(`Error loading plugin from ${pluginPath}:`, err);
      }
    });
  } catch (err) {
    console.error("Error loading plugins:", err);
  } finally {
    console.log(`Loaded ${Object.keys(plugins).length} plugins`);
  }
};
