import { BlockMetadata } from "./core/blocks";
import { Config } from "./core/config";
import { Menu, MenuType, SettingsTab } from "./core/types/menu";
import { MaybeAsyncFunction } from "./core/utils/maybe-async-fn";
import { singleton } from "./core/utils/singleton";
import { IBasePlugin, IPlugin } from "./core/types/plugin";
import { PluginModel } from "./core/models/plugin.model";
import { OptionModel } from "./core/models/option.model";
import { IOption } from "./core/types/option.type";
import { IPage, PageContentType } from "./core/types/page";
import createDBConnection from "./core/database/db.server";
import { serverOnly$ } from "vite-env-only/macros";

export const HOMEPATH_NAME = "homepath";

export type BlockMetadataFunction = MaybeAsyncFunction<any, BlockMetadata>;

class AppContext {
  private _config: IOption[] = [];

  private readonly _menus: Record<MenuType, Menu[]> = {
    app: [],
    admin: [],
  };

  private readonly _routeMenus: Record<string, Menu[]> = {};

  private readonly _settingsTabs: SettingsTab[] = [];

  // Async initialization logic for loading plugins
  async initAppEnv() {
    if (typeof document === "undefined") {
      serverOnly$(await createDBConnection());
      // singleton("mongoose", createDBConnection);
    }
    // Determine the current environment
    this._config = await OptionModel.find();
    await pluginManager.loadActivePlugins();
    // Init plugin module
    for (const activePlugin of pluginManager.activePlugins) {
      activePlugin.module(this);
    }
  }

  // Async initialization logic for loading plugins
  async use(callbackFn: (app: AppContext) => Promise<void>) {
    if (callbackFn) {
      await callbackFn(this);
    }
  }

  configs(key: string) {
    // return this._config.app;
    const option = this._config.find((option) => option.name === key);
    return option?.value;
  }

  get homepage(): {
    type: "custom" | "plugin";
    pageId?: PageContentType;
    path?: string;
  } {
    const option = this._config.find((option) => option.name === HOMEPATH_NAME);
    return option?.value;
  }

  // async loadPlugin(plugin: IPlugin) {
  //   try {
  //     if (
  //       !plugin.id ||
  //       !plugin.name ||
  //       !plugin.version ||
  //       typeof plugin.onInit !== "function"
  //     ) {
  //       throw new Error(
  //         `Invalid plugin: ${plugin.name}. Must have an id, name, version, and onInit function.`
  //       );
  //     }

  //     // Ensure plugin names are unique
  //     if (this.plugins[plugin.id]) {
  //       throw new Error(
  //         `Cannot register duplicate plugin. Plugin already with id: ${plugin.id}`
  //       );
  //     }

  //     // Initialize the plugin
  //     plugin.onInit(this);
  //     console.log(`${plugin.name} initialized`);

  //     // Cache the plugin in memory
  //     this.plugins[plugin.id] = plugin;

  //     console.log(`${plugin.name} plugin loaded.`);
  //   } catch (err) {
  //     console.error("Error loading plugins:", err);
  //   } finally {
  //     console.log(`Loaded ${Object.keys(this.plugins).length} plugins.`);
  //   }
  // }

  plugin(name: string) {
    return Object.entries(pluginManager.activePlugins).find(
      ([key, value]) => key === name
    );
  }

  get routes() {
    return pluginManager.activePlugins.flatMap((plugin) =>
      plugin.settings?.routes ? Object.values(plugin.settings.routes) : []
    );
  }

  findRoute(path: string): IPage | undefined {
    return this.routes.find((route) => route.path === path);
  }

  addMenu(menuType: MenuType, menuItem: Menu) {
    this._menus[menuType] = [...this._menus[menuType], menuItem];
  }

  get dashboardMenu() {
    return this._menus.admin;
  }

  addRouteMenu(path: string, menuItem: Menu) {
    const currentPathMenus = this._routeMenus[path] || [];
    currentPathMenus.push(menuItem);

    this._routeMenus[path] = currentPathMenus;
  }

  getRouteMenu(routePath: string): Menu[] | undefined {
    return Object.entries(this._routeMenus).find(
      ([path, menuItem]) => path === routePath
    )?.[1];
  }
}

export const getAppContext = async () => {
  // Todo Implement debounce
  const app = await singleton("app", async () => {
    const app = new AppContext();
    // Load plugins
    await app.initAppEnv();
    return app;
  });

  return app;
};

export type { AppContext };

class PluginManager {
  activePlugins: IBasePlugin[] = [];

  async loadActivePlugins() {
    const activePlugins = await PluginModel.find({ isActive: true });

    for (const plugin of activePlugins) {
      // Dynamically import and initialize active plugins
      const pluginModule = await import(/* @vite-ignore*/ plugin.path);
      if (pluginModule.default) {
        this.activePlugins.push({
          name: plugin.name,
          path: plugin.path,
          module: pluginModule.default,
          version: plugin.version,
          displayName: plugin.name,
          description: "",
        });
      }
    }
    // const pluginsConfig = app.configs.plugins;

    // // Loop through only enabled plugins in the config
    // for (const pluginConfig of pluginsConfig) {
    //   if (pluginConfig.isActive) {
    //     const pluginUrl = `/app/plugins/${pluginConfig.id}/index.ts`;

    //     try {
    //       // Dynamically load the plugin only if it is enabled
    //       const plugin: IPlugin = (await import(/* @vite-ignore */ pluginUrl))
    //         .default;

    //       console.log(`Loading plugin "${plugin.name}".`);
    //       await app.loadPlugin(plugin);
    //     } catch (err) {
    //       console.error(`Error loading plugin "${pluginConfig.name}":\n`, err);
    //     }
    //   } else {
    //     console.log(`${pluginConfig.name} is disabled and will not be loaded.`);
    //   }
    // }
  }
}

export const pluginManager = new PluginManager();
export type { PluginManager };
