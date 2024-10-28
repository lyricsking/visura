import { BlockMetadata } from "./blocks";
import { Menu, MenuType, SettingsTab } from "./types/menu";
import { MaybeAsyncFunction } from "./utils/maybe-async-fn";
import { IBasePlugin, IPlugin } from "./core/plugin/types/plugin";
import { IOption } from "./core/options/types/option.type";
import { IPage } from "./core/pages/types/page";
import createDBConnection from "./core/database/db.server";
import { serverOnly$ } from "vite-env-only/macros";

export const HOMEPATH_NAME = "homepath";
export const APP_NAME = "app_name";

export type BlockMetadataFunction = MaybeAsyncFunction<any, BlockMetadata>;

type PluginInstance = IPlugin & { instance: IBasePlugin };

class AppContext {
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
    if (typeof document === "undefined") {
      serverOnly$(await createDBConnection());
    }

    const configs = await AppContext.loadConfigOptions();
    const plugins = await AppContext.loadActivePlugins();

    AppContext.instance = new AppContext(configs, plugins);

    // Resolve all queued promises with the initialized instance
    while (AppContext.queue.length > 0) {
      const resolve = AppContext.queue.shift();
      if (resolve) resolve(AppContext.instance);
    }
  }

  static async loadConfigOptions(): Promise<any> {
    const configReq = await fetch("http://localhost:3000/api/options");
    const configRes = await configReq.json();
    return configRes.options;
  }

  static async loadActivePlugins(): Promise<PluginInstance[]> {
    const pluginReq = await fetch("http://localhost:3000/api/plugins");
    const pluginRes = await pluginReq.json();
    const plugins = pluginRes.plugins;

    const pluginsInstance: PluginInstance[] = [];

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

  configs(key: string) {
    // return this._config.app;
    const option = this._configs.find((option) => option.name === key);
    return option?.value;
  }

  get homepage(): {
    type: "custom" | "plugin";
    path: string;
  } {
    const option = this._configs.find(
      (option) => option.name === HOMEPATH_NAME
    );
    return option?.value;
  }

  plugin(name: string) {
    return Object.entries(this.activePlugins).find(
      ([key, value]) => key === name
    );
  }

  get routes() {
    return this.activePlugins.flatMap((plugin) =>
      plugin.instance.settings?.routes
        ? Object.values(plugin.instance.settings.routes)
        : []
    );
  }

  findRoute(path: string): IPage | undefined {
    return this.routes.find((route) => {
      console.log(route);

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
