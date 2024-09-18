import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { IPlugin } from "~/core/plugin"; // Ensure you import the plugin interface from where it's defined

const loadPlugins = (): { [key: string]: IPlugin } => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pluginDir = __dirname;

    // Read the plugins directory synchronously
    const pluginFolders = fs.readdirSync(pluginDir);

    // Initialize an empty object to store plugins by name
    const pluginsByName: { [key: string]: IPlugin } = {};

    // Iterate through each folder in the plugins directory
    pluginFolders.forEach((pluginFolder) => {
      const pluginPath = path.join(pluginDir, pluginFolder, "index.ts");

      try {
        // Synchronously load the plugin
        const plugin: IPlugin = require(pluginPath).default;

        // Ensure the plugin matches the IPlugin interface
        if (
          !plugin.name ||
          !plugin.version
          //        ||     typeof plugin.init !== "function"
        ) {
          throw new Error(
            `Invalid plugin: ${pluginFolder}. Plugin must have a name, version, and init function.`
          );
        }

        // Check for duplicate plugin names
        if (pluginsByName[plugin.name]) {
          throw new Error(
            `Cannot register a duplicate plugin: ${plugin.name}. Plugin name must be unique.`
          );
        }

        // Add the plugin to the object, using its name as the key
        pluginsByName[plugin.name] = plugin;
      } catch (err) {
        console.error(`Error loading plugin from ${pluginPath}:`, err);
      }
    });

    // Return the object mapping plugin names to plugin objects
    return pluginsByName;
  } catch (err) {
    console.error("Error loading plugins:", err);
    return {};
  }
};

export default loadPlugins;
