import { Types } from "mongoose";
import { IPage, IPageWithOptionalId } from "./page";
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
}

export type IPluginImpl = Pick<IPlugin, "name" | "description" | "version">;

export type ActivateFunctionData = {
  metadata: IPluginImpl;
  routes?: IPageWithOptionalId[];
  adminMenu?: Menu[];
  widgets?: Widget[];
  options?: PluginOptions;
};
