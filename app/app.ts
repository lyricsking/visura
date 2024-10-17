import { Block, BlockTypes } from "~/blocks/types/block";
import { TextBlock } from "./blocks/text";
import { Config, configSchema } from "./config";
import appConfig from "./config/app.config.json";
import pluginsConfig from "./config/plugin.config.json";
import { IPlugin } from "./plugin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export type PluginLoaderFunction = (
  app: AppContext
) => (args: any) => Promise<any> | any; // Adjust the return type as necessary

export type PluginActionFunction = (
  app: AppContext
) => (args: any) => Promise<Response | any>; // Adjust the return type as necessary

export type RouteType = "app" | "admin";
export type Route = {
  id?: string;
  path: string;
  component: string;
  loader?: ReturnType<PluginLoaderFunction>;
  action?: ReturnType<PluginActionFunction>;
};

export type MenuType = "app" | "admin";
export type Menu = {
  id: number | string;
  label: string;
  path: string;
  icon?: string;
};

export type SettingsTab = {
  id?: string;
  label: string;
  path: string;
  component: string;
  loader?: ReturnType<PluginLoaderFunction>;
  action?: ReturnType<PluginActionFunction>;
  icon?: string;
};

export default class AppContext {
  private readonly _config: Config;
  private plugins: Record<string, IPlugin>;
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

  public isInitialized: boolean = false;

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
    return this._config.app;
  }

  // Async initialization logic for loading plugins
  async init() {
    // Load plugins asynchronousllllly
    this.plugins = await this.loadPlugins();
    this.isInitialized = true;
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

      const pluginsConfig = this._config.plugins;

      // Loop through only enabled plugins in the config
      for (const pluginConfig of pluginsConfig) {
        if (pluginConfig.isActive) {
          const pluginFolder = pluginFolders.find(
            (folder) => folder.isDirectory() && folder.name === pluginConfig.id
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
              plugin.onInit(this);
              console.log(`${plugin.name} initialized`);

              // Cache the plugin in memory
              plugins[plugin.name] = plugin;

              console.log(`${plugin.name} plugin loaded.`);
            } catch (err) {
              console.error(`Error loading plugin from ${pluginPath}:`, err);
            }
          }
        } else {
          console.log(
            `${pluginConfig.name} is disabled and will not be loaded.`
          );
        }
      }
    } catch (err) {
      console.error("Error loading plugins:", err);
    } finally {
      console.log(`Loaded ${Object.keys(plugins).length} plugins.`);
      return plugins;
    }
  }

  plugin(name: string) {
    return Object.entries(this.plugins.a).find(([key, value]) => key === name);
  }

  addRoute(type: RouteType, route: Route) {
    const mRoutes = this.routes;
    if (mRoutes) {
      mRoutes[type] = [...mRoutes[type], route];
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

  addBlockType(name: keyof BlockTypes, block: BlockTypes) {}
}
