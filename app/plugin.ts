import { AppContext } from "./app";
import { IPlugin } from "./core/types/plugin";

export async function loadPlugins(app: AppContext) {
  const plugins: Record<string, IPlugin> = {};

  try {
    const pluginsConfig = app.configs.plugins;

    // Loop through only enabled plugins in the config
    for (const pluginConfig of pluginsConfig) {
      if (pluginConfig.isActive) {
        const pluginUrl = `../public/plugins/${pluginConfig.id}/index.ts`;

        try {
          // Dynamically load the plugin only if it is enabled
          const plugin: IPlugin = (await import(/* @vite-ignore */ pluginUrl))
            .default;

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

          // Initialize the plugin
          plugin.onInit(app);
          console.log(`${plugin.name} initialized`);

          // Cache the plugin in memory
          plugins[plugin.name] = plugin;

          console.log(`${plugin.name} plugin loaded.`);
        } catch (err) {
          console.error(`Error loading plugin "${pluginConfig.name}":\n`, err);
        }
      } else {
        console.log(`${pluginConfig.name} is disabled and will not be loaded.`);
      }
    }
  } catch (err) {
    console.error("Error loading plugins:", err);
  } finally {
    console.log(`Loaded ${Object.keys(plugins).length} plugins.`);
    return plugins;
  }
}
export { IPlugin };

