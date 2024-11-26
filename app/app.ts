import { Menu, MenuType, SettingsTab } from "./types/menu";
import { MaybeAsyncFunction } from "./core/utils/maybe-async-fn";
import { IBasePlugin, IPlugin } from "./core/plugin/types/plugin";
import { IPage } from "./core/page/types/page";
import createDBConnection from "./core/database/db.server";
import { serverOnly$ } from "vite-env-only/macros";
import { DisplayOptions } from "./admin/type/options";
import { DISPLAY_OPTION_KEY, IOption } from "./core/option/types/option";

export const APP_NAME = "app_name";

type PluginInstance = IPlugin & { instance: IBasePlugin };

class AppContext {
  private static baseUrl =
    "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu116.gitpod.io";
  // "https://ynm7f3-3000.csb.app";
  // "http://localhost:3000";

  private static instance: AppContext | null = null;
  private static queue: Array<(instance: AppContext) => void> = [];

  private readonly _menus: Record<MenuType, Menu[]> = {
    app: [],
    admin: [],
  };

  private readonly _routeMenus: Record<string, Menu[]> = {};

  private readonly _settingsTabs: SettingsTab[] = [];

  private constructor(
    private _configs: IOption[],
    private activePlugins: PluginInstance[]
  ) {
    console.log("App initialized");
  }

  static async getInstance(): Promise<AppContext> {
    if (AppContext.instance) return AppContext.instance;

    return new Promise<AppContext>((resolve) => {
      AppContext.queue.push(resolve);

      if (AppContext.queue.length === 1) {
        AppContext.init();
      }
    });
  }

  private static async init() {
    if (
      process.env.NODE_ENV === "production" &&
      typeof document === "undefined"
    ) {
      serverOnly$(await createDBConnection());
    }

    const [configs, plugins] = await Promise.all([
      AppContext.loadConfigOptions(),
      AppContext.loadActivePlugins(),
    ]);

    AppContext.instance = new AppContext(configs, plugins);

    // Resolve all queued promises with the initialized instance
    while (AppContext.queue.length > 0) {
      const resolve = AppContext.queue.shift();
      if (resolve) resolve(AppContext.instance);
    }
  }

  static async loadConfigOptions(): Promise<any> {
    let configReq;
    if (typeof document === "undefined") {
      configReq = await fetch("http://localhost:3000/api/options");
    } else {
      configReq = await fetch(`${this.baseUrl}/api/options`);
    }

    const configRes = await configReq.json();

    console.log("Fetched configurations");

    return configRes.data;
  }

  static async loadActivePlugins(): Promise<PluginInstance[]> {
    const pluginsInstance: PluginInstance[] = [];

    let pluginReq;
    if (typeof document === "undefined") {
      pluginReq = await fetch("http://localhost:3000/api/plugins");
    } else {
      pluginReq = await fetch(`${this.baseUrl}/api/plugins`);
    }
    const pluginRes = await pluginReq.json();
    const plugins = pluginRes.data;

    console.log("Fetched plugins");

    for (const plugin of plugins) {
      // Dynamically import and initialize active plugins
      const pluginModule = await import(/* @vite-ignore*/ plugin.path);
      if (pluginModule.default) {
        pluginsInstance.push({
          id: plugin.id,
          name: plugin.name,
          description: plugin.description,
          path: plugin.path,
          isActive: plugin.isActive,
          settings: plugin.settings,
          version: plugin.version,
          // displayName: plugin.name,
          instance: new pluginModule.default(plugin),
        });
      }
    }
    return pluginsInstance;
  }

  // Async initialization logic for loading plugins
  async use(callbackFn: (app: AppContext) => Promise<void>) {
    if (callbackFn) {
      await callbackFn(this);
    }
  }

  config(key: string) {
    const option = this._configs.find((option) => option.name === key);
    return option?.value;
  }

  get homepageConfig(): DisplayOptions["homepage"] {
    const option = this._configs.find(
      (option) => option.name === DISPLAY_OPTION_KEY
    );

    return option?.value["homepage"];
  }

  get pluginRoutes() {
    return this.activePlugins.flatMap((plugin) =>
      plugin.instance.routes ? Object.values(plugin.instance.routes) : []
    );
  }

  plugin(name: string) {
    return Object.entries(this.activePlugins).find(
      ([key, value]) => key === name
    );
  }

  findRoute(path: string): Omit<IPage, "id"> | undefined {
    return this.pluginRoutes.find((route) => {
      return route.path === path;
    });
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

export const getAppContext = (): Promise<AppContext> => {
  return AppContext.getInstance();
};

export type { AppContext };
