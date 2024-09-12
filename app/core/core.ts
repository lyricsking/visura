import { PluginTypes } from "./declarations";

export class AppContext {
  plugins: Partial<PluginTypes> = {};

  use<T extends keyof PluginTypes>(
    pluginName: T,
    pluginInstance: PluginTypes[T]
  ) {
    this.plugins[pluginName] = pluginInstance;
  }

  plugin<T extends keyof PluginTypes>(
    pluginName: T
  ): PluginTypes[T] | undefined {
    return this.plugins[pluginName];
  }

  //plugins() { return this.plugins}
}
