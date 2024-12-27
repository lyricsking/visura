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
  path: string;
  isActive: boolean;
  options?: PluginOptions;
  version: string;
}

export interface PluginInstance extends IPlugin {
  routes: Record<string, any>;
}
