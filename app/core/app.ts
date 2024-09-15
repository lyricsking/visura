import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { PluginOptions, PluginTypes } from "./declarations";

export class AppContext {
  /**
   *
   */
  constructor(public route: DefineRouteFunction) {}

  plugins: Partial<PluginTypes> = {};

  configure(callback: Function) {
    callback(this);
  }

  usePlugin<T extends keyof PluginTypes & string>(
    path: T,
    plugin: PluginTypes[T]
  ) {
    this.plugins[path] = plugin;

    return this;
  }

  plugin<T extends keyof PluginTypes>(
    pluginName: T
  ): PluginTypes[T] | undefined {
    return this.plugins[pluginName];
  }
}