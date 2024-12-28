import { Types } from "mongoose";
import { IPage } from "./page";
import { Menu } from "~/shared/types/menu";
import { z } from "zod";
import { Widget } from "./widget";

export const PLUGIN_KEY = "plugins";

export interface PluginOptions {
  [key: string]: any;
}

export interface IPlugin {
  _id: Types.ObjectId;
  name: string;
  description: string;
  // path: string; // CDN or local path to plugin configuration
  version: string;
  isActive: boolean;
  routes?: Omit<IPage, "_id">[];
  adminMenu?: Menu[];
  widgets: Widget[];
  options?: PluginOptions;
}
