import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { PluginSettingsType } from "~/config";
import { Menu } from "~/utils/menu";

export interface IPlugin<Configs extends PluginSettingsType = any> {
  name: string;
  description: string;
  version: string;
  defaultConfig: Configs;
  registerRoutes: (defineRoute: DefineRouteFunction, config: Configs) => any; // This could register routes
}
