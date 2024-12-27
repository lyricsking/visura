import { Types } from "mongoose";
import { IPage } from "./page";

export const PLUGIN_KEY = "plugins";

export interface PluginOptions {
  [key: string]: any;
}

export interface IPlugin {
  _id: Types.ObjectId;
  name: string;
  description: string;
  isActive: boolean;
  options?: PluginOptions;
  version: string;
}

export interface PluginImpl {
  name: string;
  description: string;
  options?: PluginOptions;
  version: string;
  routes: Record<string, any>;
}

export interface PluginInstance extends PluginImpl {
  readonly path: string; // Path to load the plugin from; used to load plugin from internal or external host
}
