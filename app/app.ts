import { Config, configSchema } from "./config";
import appConfig from "./config/app.config.json";
import pluginsConfig from "./config/plugin.config.json";
import { IPlugin } from "./plugin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as lo from "lodash";

export default class AppContext {
  private readonly config: Config;
  private plugins: Record<string, IPlugin>;

  constructor() {
    this.config = this.loadConfig();
    this.plugins = {};
  }

  // Async initialization logic for loading plugins
  async init() {
    // Load plugins asynchronously
    this.plugins = await this.loadPlugins();
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
      plugins: [...pluginsConfig["default"], ...pluginsConfig[env]],
    };

    const configParse = configSchema.safeParse(envConfig);
    if (configParse.error) {
      throw configParse.error;
    }

    return configParse.data;
  }

  private async loadPlugins() {
    const plugins: Record<string, IPlugin> = {};

    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const pluginDir = path.join(__dirname, "plugins");

      // Asynchronously read the plugins directory
      const pluginFolders = await fs.promises.readdir(pluginDir, {
        withFileTypes: true,
      });

      const pluginsConfig = this.config.plugins;

      // Loop through only enabled plugins in the config
      for (const [pluginName, pluginConfig] of Object.entries(pluginsConfig)) {
        if (pluginConfig.enabled) {
          const pluginFolder = pluginFolders.find(
            (folder) => folder.isDirectory() && folder.name === pluginName
          );

          if (pluginFolder) {
            const pluginPath = path.join(
              pluginDir,
              pluginFolder.name,
              "index.ts"
            );

            try {
              // Dynamically load the plugin only if it is enabled
              const plugin: IPlugin = (
                await import(/* @vite-ignore */ pluginPath)
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
                throw new Error(
                  `Duplicate plugin name detected: ${plugin.name}`
                );
              }

              // Initialize the plugin
              plugin.onInit();
              console.log(`${plugin.name} initialized`);

              // Cache the plugin in memory
              plugins[plugin.name] = plugin;

              console.log(`${plugin.name} plugin loaded.`);
            } catch (err) {
              console.error(`Error loading plugin from ${pluginPath}:`, err);
            }
          }
        } else {
          console.log(`${pluginName} is disabled and will not be loaded.`);
        }
      }
    } catch (err) {
      console.error("Error loading plugins:", err);
    } finally {
      console.log(`Loaded ${Object.keys(plugins).length} plugins.`);
      return plugins;
    }
  }
}
