import { AppContext } from "./app";
import { IPlugin } from "./core/types/plugin";

export async function loadPlugins(app: AppContext) {
  const pluginsConfig = app.configs.plugins;

  // Loop through only enabled plugins in the config
  for (const pluginConfig of pluginsConfig) {
    if (pluginConfig.isActive) {
      const pluginUrl = `/app/plugins/${pluginConfig.id}/index.ts`;

      try {
        // Dynamically load the plugin only if it is enabled
        const plugin: IPlugin = (await import(/* @vite-ignore */ pluginUrl))
          .default;

        console.log(`Loading plugin "${plugin.name}".`);
        await app.loadPlugin(plugin);
      } catch (err) {
        console.error(`Error loading plugin "${pluginConfig.name}":\n`, err);
      }
    } else {
      console.log(`${pluginConfig.name} is disabled and will not be loaded.`);
    }
  }
}
