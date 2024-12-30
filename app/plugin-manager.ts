import { IPlugin } from "./shared/types/plugin";

export class PluginManager {
  private loading: Set<string> = new Set(); // To track loading plugins
  private cache: Map<string, any> = new Map(); // cache plugin data

  constructor(private plugins: IPlugin[]) {}

  get activePlugins() {
    return this.plugins.filter((plugin) => plugin.isActive === true);
  }

  // // Load plugin configuration asynchronously
  // async loadPlugin(pluginName: string) {
  //   if (this.loading.has(pluginName)) {
  //     return null; // Prevent loading same plugin multiple times
  //   }

  //   if (this.cache.has(pluginName)) {
  //     return this.cache.get(pluginName); // Return cache plugin data
  //   }

  //   this.loading.add(pluginName);

  //   try {
  //     const plugin = await this.fetchPlugin(pluginName);
  //     if (plugin) {
  //       this.cache.set(pluginName, plugin);
  //       return plugin;
  //     }
  //   } catch (error) {
  //     logger(error);
  //     console.error(`Error loading plugin ${pluginName}:`, error);
  //   } finally {
  //     this.loading.delete(pluginName);
  //   }

  //   return null;
  // }

  // async fetchPlugin(pluginName: string): Promise<IPlugin | null> {
  //   try {
  //     const response = await fetch(`${this.pluginRegistryUrl}`);
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch plugin: ${pluginName}`);
  //     }

  //     const plugin = await response.json();
  //     return plugin;
  //   } catch (error) {
  //     logger(error);
  //     console.error(`Error fetching plugin ${pluginName}:`, error);
  //     return null;
  //   }
  // }

  // async installPlugin(pluginName: string): Promise<void> {
  //   const plugin = await this.loadPlugin(pluginName);
  //   if (plugin) {
  //     this.plugins.set(pluginName, plugin);
  //     console.log(`Plugin ${pluginName} installed successfully`);
  //   }
  // }

  // async enablePlugin(pluginName: string): Promise<void> {
  //   const plugin = this.plugins.get(pluginName);
  //   if (plugin && !plugin.isActive) {
  //     plugin.isActive = true;
  //     await this.activatePlugin(plugin);
  //     console.log(`Plugin ${pluginName} installed successfully`);
  //   }
  // }

  // async disablePlugin(pluginName: string): Promise<void> {
  //   const plugin = this.plugins.get(pluginName);
  //   if (plugin && plugin.isActive) {
  //     plugin.isActive = false;
  //     await this.deactivatePlugin(plugin);
  //   }
  // }

  // async uninstall(pluginName: string): Promise<void> {
  //   const plugin = this.plugins.get(pluginName);
  //   if (plugin) {
  //     await this.deactivatePlugin(plugin);
  //     this.plugins.delete(pluginName);
  //     console.log(`Plugin ${pluginName} uninstalled.`);
  //   }
  // }

  // // Activate plugin features such as register routes, menu etc
  // async activatePlugin(plugin: IPlugin): Promise<void> {
  //   // Load the plugin's routes, pages, menus etc the plugin provides
  //   console.log(`Ativating plugin ${plugin.name}`);
  // }

  // // Deactivate plugin features
  // async deactivatePlugin(plugin: IPlugin): Promise<void> {
  //   console.log(`Deactivating plugin ${plugin.name}`);
  // }
}
