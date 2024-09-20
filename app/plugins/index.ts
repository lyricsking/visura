import { IPlugin } from "~/core/plugin";
import blogPlugin from "./blog";
import dashboardPlugin from "./dashboard";
import { Menu } from "~/utils/menu";

// Define your plugin loader function
const loadPlugins = (): { [key: string]: IPlugin } => {
  // Manually register plugins
  const plugins: { [key: string]: IPlugin } = {};

  const allPlugins = [blogPlugin, dashboardPlugin];

  // Iterate through the manually imported plugins
  for (const plugin of allPlugins) {
    if (
      !plugin.name ||
      !plugin.version
      // || typeof plugin.init !== "function"
    ) {
      throw new Error(
        `Invalid plugin: ${plugin.name}. Must have a name, version, and init function.`
      );
    }

    // Ensure plugin names are unique
    if (plugins[plugin.name]) {
      throw new Error(`Duplicate plugin name detected: ${plugin.name}`);
    }

    plugins[plugin.name] = plugin;
  }

  return plugins;
};

const plugins = loadPlugins();
export default plugins;

declare module "~/core/plugin" {
  export interface IPlugin {
    dashboardMenu?: Menu[];
  }
}
