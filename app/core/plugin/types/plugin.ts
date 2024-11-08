import { Types } from "mongoose";
import { IPage } from "../../page/types/page";
import { AppContext } from "~/app";

export const PLUGIN_KEY = "plugins";

export interface PluginSetting {
  [key: string]: any;
}

export interface IBasePlugin {
  name: string;
  description: string;
  path: string;
  // displayName: string;
  settings?: PluginSetting;
  routes: Omit<IPage, "id">[];
  version: string;
}

export interface IPlugin
  extends Pick<IBasePlugin, "name" | "description" | "path" | "version"> {
  id: Types.ObjectId;
  isActive: boolean;
  settings: Omit<PluginSetting, "routes"> & {
    routes: string[];
  };
}
