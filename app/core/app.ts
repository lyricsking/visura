import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { PluginOptions, PluginTypes } from "./declarations";

export class AppContext {
  /**
   *
   */
  constructor(private route: DefineRouteFunction) {}

  plugins: Partial<PluginTypes> = {};

  configure(callback: Function) {
    callback(this);
  }

  usePlugin<T extends keyof PluginTypes & string>(
    path: T,
    plugin: PluginTypes[T],
    options?: PluginOptions
  ) {
    if (options && options.enabled) {
      this.plugins[path] = plugin;

      options?.routes?.(this.route);
    }
    return this;
  }

  plugin<T extends keyof PluginTypes>(
    pluginName: T
  ): PluginTypes[T] | undefined {
    return this.plugins[pluginName];
  }
}
