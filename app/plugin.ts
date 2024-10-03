import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { singleton } from "./utils/singleton";

export const PLUGIN_KEY = "plugins";

export interface IPlugin {
  name: string;
  description: string;
  version: string;
  settings?: Record<string, any>;
  onInit?: () => void;
  onDestroy?: () => void;
  layoutComponent?: React.ComponentType;
}
