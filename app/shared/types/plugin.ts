import { Types } from "mongoose";
import { IPage } from "./page";
import { Menu } from "~/shared/types/menu";
import { Widget } from "./widget";

export const PLUGIN_KEY = "plugins";

export interface PluginOptions {
  [key: string]: any;
}

export interface IPlugin {
  _id: Types.ObjectId;
  name: string;
  description: string;
  version: string;
  isActive: boolean;
  routes?: Omit<IPage, "_id">[];
  adminMenu?: Menu[];
  widgets?: Widget[];
  options?: PluginOptions;
}

export type IPluginImpl = Pick<
  IPlugin,
  | "name"
  | "description"
  | "version"
  | "routes"
  | "adminMenu"
  | "widgets"
  | "options"
>;
