import { BlockMetadata } from "./core/blocks";
import { Config, configSchema } from "./core/config";
import appConfig from "./core/config/app.config.json";
import pluginsConfig from "./core/config/plugin.config.json";
import { Menu, MenuType } from "./core/types/menu";
import { IPlugin } from "./core/types/plugin";
import { PluginLoaderFunction, PluginActionFunction, RouteType, Route } from "./core/types/route";
import { MaybeAsyncFunction } from "./core/utils/maybe-async-fn";
import { singleton } from "./core/utils/singleton";
import { loadPlugins } from "./plugin";

export type BlockMetadataFunction = MaybeAsyncFunction<any, BlockMetadata>;

// export type Route = {
//   id?: string;
//   path: string;
//   getBlock: BlockMetadataFunction;
// };

export type SettingsTab = {
  id?: string;
  label: string;
  path: string;
  component: string;
  loader?: ReturnType<PluginLoaderFunction>;
  action?: ReturnType<PluginActionFunction>;
  icon?: string;
};

export class AppContext {
  private readonly _config: Config;
  private plugins: Record<string, IPlugin>;

  private isInitialized = false;

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
  async init() {
    if (!this.isInitialized || Object.entries(this.plugins).length === 0) {
      // Setup debounce here to prevent multiple calls.
      // Load plugins asynchronously
      this.plugins = await loadPlugins(this);
      this.isInitialized = true;
    }
  }

  plugin(name: string) {
    return Object.entries(this.plugins.a).find(([key, value]) => key === name);
  }

  addRoute(type: RouteType, route: Route) {
    try {
      
    const typeRoutes = this.routes[type];
    const existTypeRoute = typeRoutes.find((typeRoute)=> typeRoute.path === route.path);
    
    if(existTypeRoute){
      throw new Error(`Cannot register duplicate route. A route already exists for "${existTypeRoute.path}.`);
    }
    
    if(typeof document === "undefined") {
      typeRoutes.push(route);
    } else{
      const { loader, action, ...clientRouteData } = route;
      typeRoutes.push(clientRouteData);
    }
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

export const appContext = singleton<AppContext>("app", async () => {
  const app = new AppContext();

  if (app) {
    //await app.init();
    await app.init();
  }

  return app;
});
