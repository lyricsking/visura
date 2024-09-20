import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { PluginSettingsType } from "~/config";

export interface IPlugin<Configs extends PluginSettingsType = any> {
  name: string;
  description: string;
  version: string;
  defaultConfig: Configs;
  registerRoutes: (defineRoute: DefineRouteFunction, config: Configs) => any; // This could register routes
}
