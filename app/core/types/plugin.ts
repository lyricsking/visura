import { Types } from "mongoose";
import { IPage, IPageWithOptionalId, PageContentType } from "./page";
import { Menu } from "~/core/types/menu";
import { ContextType } from "react";
import { IContentType, PluginSchema } from "./content";
import { Widget } from "../widget";

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

export type ActivateFunctionReturnType = {
  adminMenu?: Menu[];
  metadata: IPluginImpl;
  options?: PluginOptions;
  routes?: IPageWithOptionalId[];
  widgets?: Widget[];
  collections?: Pick<IContentType, "name" | "modelName" | "fields">;
};
