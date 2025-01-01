import { PluginManager } from "./plugin.server";
import { MenuType, Menu, SettingsTab } from "./shared/types/menu";
import { IOption } from "./shared/types/option";

export const APP_NAME = "app_name";

class AppContext {
  private static baseUrl: string;
  //   "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu117.gitpod.io";
  // // "https://ynm7f3-3000.csb.app";
  // // "http://localhost:3000";

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
    public readonly plugins: PluginManager
  ) {
    console.log("App initialized");
  }

  static async getInstance(baseUrl: string): Promise<AppContext> {
    if (AppContext.instance) return AppContext.instance;

    return new Promise<AppContext>((resolve) => {
      AppContext.queue.push(resolve);

      if (AppContext.queue.length === 1) {
        this.baseUrl = baseUrl;
        AppContext.init();
      }
    });
  }

  private static async init() {
    const [configs, plugins] = await Promise.all([
      AppContext.loadConfigOptions(),
      AppContext.initPluginManger(),
    ]);

    AppContext.instance = new AppContext(configs, plugins);

    // Resolve all queued promises with the initialized instance
    while (AppContext.queue.length > 0) {
      const resolve = AppContext.queue.shift();
      if (resolve) resolve(AppContext.instance);
    }
  }

  static async loadConfigOptions(): Promise<any> {
    const url = new URL(`${this.baseUrl}/api/options`);
    url.searchParams.set("autoload", "true");
    // url.searchParams.set("type", "system");

    const configReq = await fetch(url);

    const configRes = await configReq.json();
    const configs = configRes.data;

    console.log("Fetched configurations", configs);

    return configs;
  }

  static initPluginManger(): PluginManager {
    return new PluginManager();
  }

  // config(key: string) {
  //   const option = this._configs.find((option) => option.name === key);
  //   return option?.value;
  // }

  // get homepageConfig(): DisplayOptions["homepage"] {
  //   const option = this._configs.find(
  //     (option) => option.name === DISPLAY_OPTION_KEY
  //   );

  //   return option?.value["homepage"];
  // }

  // routes() {
  //   return this.pluginsManager.activePlugins.reduce((acc, plugin) => {
  //     plugin.routes &&
  //       plugin.routes.forEach((page) => {
  //         acc[page.path] = page; // Map the path to the page object
  //       });

  //     return acc;
  //   }, {} as Record<string, Omit<IPage, "_id">>);
  // }

  // get pluginRoutes() {
  //   return this.activePlugins.flatMap((plugin) =>
  //     plugin.routes ? Object.values(plugin.routes) : []
  //   );
  // }

  // plugin(name: string) {
  //   return Object.entries(this.activePlugins).find(
  //     ([key, value]) => key === name
  //   );
  // }

  // findRoute(path: string): /* Omit<IPage, "id">*/ any | undefined {
  //   return this.pluginRoutes.find((route) => {
  //     return route.path === path;
  //   });
  // }

  // addMenu(menuType: MenuType, menuItem: Menu) {
  //   this._menus[menuType] = [...this._menus[menuType], menuItem];
  // }

  // get dashboardMenu() {
  //   return this._menus.admin;
  // }

  // addRouteMenu(path: string, menuItem: Menu) {
  //   const currentPathMenus = this._routeMenus[path] || [];
  //   currentPathMenus.push(menuItem);

  //   this._routeMenus[path] = currentPathMenus;
  // }

  // getRouteMenu(routePath: string): Menu[] | undefined {
  //   return Object.entries(this._routeMenus).find(
  //     ([path, menuItem]) => path === routePath
  //   )?.[1];
  // }
}

export const getAppContext = (baseUrl: string): Promise<AppContext> => {
  return AppContext.getInstance(baseUrl);
};

export type { AppContext };
