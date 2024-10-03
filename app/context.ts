import { Config, configSchema } from "./config";
import appConfig from "./config/app.config.json";
import pluginsConfig from "./config/plugin.config.json";
import { IPlugin } from "./plugin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default class Context {
  private readonly config: Config;
  private readonly plugins: Record<string, IPlugin>={};

   constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig() {
    // Determine the current environment
    const env =
      process.env.NODE_ENV === "production" ? "production" : "development";

    const envConfig: Partial<Config> = {
      app: {
        ...appConfig["default"],
        ...appConfig[env],
      },
      plugins: {
        ...pluginsConfig["default"],
        ...pluginsConfig[env],
      },
    };

    const configParse = configSchema.safeParse(envConfig);
    if (configParse.error) {
      throw configParse.error;
    }

    return configParse.data;
  }

   async  loadPlugins(){
    const plugins: Record<string, IPlugin> = {};

    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const pluginDir = path.join(__dirname, "plugins");
      //const pluginDir = __dirname;
      // Read the plugins directory synchronously
      const pluginFolders = fs.readdirSync(pluginDir);

      const pluginsConfig = this.config.plugins;

      // Filter and load only directories containing an index.ts file
      for (let pluginFolder of pluginFolders) {
        const pluginPath = path.join(pluginDir, pluginFolder, "index.ts");

        try {
          // Synchronously load the plugin using dynamic import
          const plugin: IPlugin = (
            await import(/* @vite-ignore */ pluginPath as string)
          ).default;

          console.log(`Loading plugin "${plugin.name}".`);

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
          if (pluginsConfig.find([plugin.name]) {
            plugin.onInit();

            console.log(`${plugin.name} initialized`);
          }
          console.log(`${plugin.name} plugin loaded.`);
        } catch (err) {
          console.error(`Error loading plugin from ${pluginPath}:`, err);
        }
      }
    } catch (err) {
      console.error("Error loading plugins:", err);
    } finally {
      console.log(`Loaded ${Object.keys(plugins).length} plugins.`);
      return plugins;
    }
  };
}