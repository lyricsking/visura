import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { PluginSettingsSchema } from "~/config";

export interface IPlugin {
  name: string;
  version: string;
  defaultConfig: PluginSettingsSchema;
  registerRoutes: (path: string, defineRoute: DefineRouteFunction) => any; // This could register routes
}
