import { Types } from "mongoose";
import { AppContext } from "~/app";

export const PLUGIN_KEY = "plugins";

interface PluginSetting {
  routes?: [];
  [key: string]: any;
}

export interface IPlugin {
  id: Types.ObjectId;
  name: string;
  path: string;
  isActive: boolean;
  settings: PluginSetting;
  version: string;
}
