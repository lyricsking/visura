import { Types } from "mongoose";
import { IPage } from "./page";
import { AppContext } from "~/app";

export const PLUGIN_KEY = "plugins";

export interface PluginSetting {
  routes: IPage[];
  [key: string]: any;
}

type PluginModule = (app: AppContext) => void;

export interface IBasePlugin {
  name: string;
  description: string;
  path: string;
  // displayName: string;
  module: PluginModule;
  settings?: PluginSetting;
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
