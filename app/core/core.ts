import { IPlugin } from "~/core/plugins";
import { PluginTypes } from "./declarations";

export class AppContext {
  private plugins: PluginTypes = {};

  // plugin(pluginName: string) {
  //   return this.pluginConfigs[pluginName];
  // }
  use(pluginName: keyof PluginTypes, plugin: IPlugin) {
    this.plugins[pluginName] = plugin;
  }
}
