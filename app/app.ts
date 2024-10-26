import mongoose, { model, Model, models, Schema, Types } from "mongoose";
import { BlockMetadata } from "./core/blocks";
import { Config, configSchema } from "./core/config";
import appConfig from "./core/config/app.config.json";
import pluginsConfig from "./core/config/plugin.config.json";
import { Menu, MenuType, SettingsTab } from "./core/types/menu";
import {
  PluginLoaderFunction,
  PluginActionFunction,
  RouteType,
  Route,
} from "./core/types/route";
import { MaybeAsyncFunction } from "./core/utils/maybe-async-fn";
import { singleton } from "./core/utils/singleton";
import { IPlugin } from "./core/types/plugin";
import { Plugin } from "./core/models/plugin.model";

export type BlockMetadataFunction = MaybeAsyncFunction<any, BlockMetadata>;

class AppContext {
  private readonly _config: Config;

  isInitialized: boolean = false;
  private plugins: Record<string, IPlugin>;

  /**
   * Registry to hold routes
   */
  private routes: Record<RouteType, Route[]> = {
    app: [],
    admin: [],
  };

  private homePaths: Record<string, string> = {};

  private readonly _menus: Record<MenuType, Menu[]> = {
    app: [],
    admin: [],
  };

  private readonly _routeMenus: Record<string, Menu[]> = {};

  private readonly _settingsTabs: SettingsTab[] = [];

  constructor() {
    this._config = this.loadConfig();
    this.plugins = {};
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

  get(name: string) {
    return Object.entries(this._config.app).find(
      ([key, value]) => key === name
    );
  }

  get configs() {
    // return this._config.app;

    return this._config;
  }

  // Async initialization logic for loading plugins
  async loadPlugins() {
    await pluginManager.loadActivePlugins();
  }

  // Async initialization logic for loading plugins
  async use(callbackFn: (app: AppContext) => Promise<void>) {
    if (callbackFn) {
      await callbackFn(this);
    }
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
    return Object.entries(this.plugins).find(([key, value]) => key === name);
  }

  addRoute(type: RouteType, route: Route) {
    try {
      const typeRoutes = this.routes[type];
      const existTypeRoute = typeRoutes.find(
        (typeRoute) => typeRoute.path === route.path
      );

      if (existTypeRoute) {
        throw new Error(
          `Cannot register duplicate route. A route already exists for "${existTypeRoute.path}.`
        );
      }

      typeRoutes.push(route);

      this.routes[type] = typeRoutes;
    } catch (e) {
      console.log("Cannot register route: ", e);
    }
  }

  findRoute(type: RouteType, path?: string): undefined | Route | Route[] {
    const mRoutes = this.routes;
    if (mRoutes) {
      const typeRoutes = mRoutes[type];

      if (!typeRoutes) return undefined;

      if (!path) return typeRoutes;

      return typeRoutes.find((route) => route.path === path);
    }

    return undefined;
  }

  addHomepagePath(name: string, path: string) {
    if (!this.homePaths[name]) {
      this.homePaths[name] = path;
    }
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

  configure(fn: (app: AppContext) => any) {
    fn(this);
  }
}

export const getAppContext = async () => {
  // Todo Implement debounce
  const app = singleton("app", async () => {
    const app = new AppContext();
    // Load plugins
    app.loadPlugins();
    return app;
  });

  return app;
};

export type { AppContext };

class PluginManager {
  activePlugins: any[] = [];

  async loadActivePlugins() {
    const activePlugins = await Plugin.find({ isActive: true });

    for (const plugin of activePlugins) {
      // Dynamically import and initialize active plugins
      const pluginModule = await import(plugin.path);
      if (pluginModule.default) {
        this.activePlugins.push({
          name: plugin.name,
          module: pluginModule.default,
          settings: plugin.settings,
          version: plugin.version,
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
