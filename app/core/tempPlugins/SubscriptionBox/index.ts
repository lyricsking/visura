import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { AppContext } from "~/app";
import { IPlugin } from "~/core/declarations";

export const pluginName = "subscriptionBox";

class SubscriptionBox implements IPlugin {
  name = pluginName;
  description = "";
  version = "0.0.1";
  /**
   *
   */
  constructor(app: AppContext) {}
  routes(route: DefineRouteFunction) {}
}

const subscription = (app: AppContext) => {
  app.usePlugin(pluginName, new SubscriptionBox(app));
  console.log("Blog plugin initialized");
};

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: SubscriptionBox;
  }
}

export default subscription;
