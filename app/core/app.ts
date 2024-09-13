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
    options?: PluginOptions<PluginTypes[T]>
  ) {
    this.plugins[path] = plugin;

    plugin.routes(this.route);
  }

  plugin<T extends keyof PluginTypes>(
    pluginName: T
  ): PluginTypes[T] | undefined {
    return this.plugins[pluginName];
  }
}
