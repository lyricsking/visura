import path from "path";
import {
  ActivateFunctionReturnType,
  IPlugin,
  IPluginImpl,
  PluginOptions,
} from "./shared/types/plugin";
import fs from "fs";
import { logger } from "./shared/utils/logger";
import { Widget } from "./shared/types/widget";
import { Menu } from "./shared/types/menu";
import { IPageWithOptionalId } from "./shared/types/page";
import { PluginModel } from "./backend/models/plugin.model";
import { OptionModel } from "./backend/models/option.server";
import { IOption } from "./shared/types/option";
import { PageModel } from "./backend/models/page.server";
import { fileURLToPath } from "url";

let __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PLUGIN_INSTALL_FOLDER = path.join(__dirname, "../plugins");

export class PluginManager {
  private installedPlugins: Map<string, string> = new Map();
  private loading: Set<string> = new Set(); // To track loading plugins
  private cache: Map<string, ActivateFunctionReturnType> = new Map(); // cache plugin

  constructor() {
    this.getInstalledPlugins();
  }

  getInstalledPlugins(): void {
    if (!fs.existsSync(PLUGIN_INSTALL_FOLDER)) {
      return;
    }

    const pluginFolders = fs.readdirSync(PLUGIN_INSTALL_FOLDER);

    for (const pluginFolder of pluginFolders) {
      try {
        const pluginPath = path.join(PLUGIN_INSTALL_FOLDER, pluginFolder);

        if (this.installedPlugins.has(pluginFolder)) {
          return;
        }
        //

        this.installedPlugins.set(pluginFolder, pluginPath);

        console.log("PluginManager Initialized");
      } catch (error) {
        logger(error);
        console.error(`Error loading plugin ${pluginFolder}:`, error);
      }
    }
  }

  // Load plugin configuration asynchronously
  async activatePlugin(pluginName: string): Promise<void> {
    const pluginData = await this.loadPlugin(pluginName);

    if (!pluginData) {
      return;
    }

    const { adminMenu, metadata, options, routes, widgets } = pluginData;

    adminMenu && this.registerMenu(adminMenu);
    await this.registerMetadata(metadata);
    options && (await this.registerOptions(options));
    routes && (await this.registerRoutes(pluginName, routes));
    widgets && this.registerWidgets(widgets);
  }

  async loadPlugin(
    pluginName: string
  ): Promise<ActivateFunctionReturnType | null | undefined> {
    if (this.loading.has(pluginName)) {
      return null; // Prevent loading same plugin multiple times
    }

    if (this.cache.has(pluginName)) {
      return this.cache.get(pluginName); // Return cache plugin data
    }

    this.loading.add(pluginName);

    try {
      if (!this.isPluginInstalled(pluginName)) {
        throw new Error("Plugin does not exist.");
      }

      const pluginPath = path.join(PLUGIN_INSTALL_FOLDER, pluginName);
      const pluginEntry = path.join(pluginPath, `/dist/${pluginName}.js`);

      if (!fs.existsSync(pluginEntry)) {
        throw new Error("Plugin entry file not found.");
      }

      let relativeEntryPath = path.relative(process.cwd(), pluginEntry);

      relativeEntryPath = relativeEntryPath
        .split(path.sep)
        .join(path.posix.sep);

      console.log(relativeEntryPath);

      const plugin = await import(
        /* @vite-ignore */ `../plugins/${pluginName}/dist/${pluginName}`
      );

      if (!plugin || typeof plugin.activate !== "function") {
        throw new Error("Plugin must export an activate function.");
      }

      const pluginData: ActivateFunctionReturnType = await plugin.activate();

      this.cache.set(pluginName, pluginData);

      return pluginData;
    } catch (error) {
      logger(error);
      console.error(`Error loading plugin ${pluginName}:`, error);
    } finally {
      this.loading.delete(pluginName);
    }
  }

  isPluginInstalled(plugnFolderName: string): boolean {
    return fs.existsSync(path.join(PLUGIN_INSTALL_FOLDER, plugnFolderName));
  }

  registerMenu(adminMenu: Menu[]) {}

  async registerMetadata(metadata: IPluginImpl) {
    await PluginModel.findOneAndUpdate({ name: metadata.name }, metadata, {
      upsert: true,
      new: true,
    });
  }

  async registerOptions(options: PluginOptions) {
    const optionsData: Pick<IOption, "name" | "value" | "autoload">[] =
      Object.entries(options).map(([name, value]) => ({
        name,
        value,
        autoload: false,
      }));

    await OptionModel.insertMany(optionsData);
  }

  async registerRoutes(plugin: string, routes: IPageWithOptionalId[]) {
    for (const route of routes) {
      const page = await PageModel.findOneAndUpdate(
        { uniqueId: route.uniqueId },
        route,
        {
          upsert: true,
          new: true,
        }
      );

      console.log(page);
    }
  }

  registerWidgets(widgets: Widget[]) {}

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
