import { AppContext } from "~/app";

export const PLUGIN_KEY = "plugins";

export interface IPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  settings?: Record<string, any>;
  onInit: (app: AppContext) => void;
  onDestroy: () => void;
  layoutComponent?: React.ComponentType;
}
