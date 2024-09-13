import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { AppContext } from "~/core/app";
import { IPlugin } from "~/core/declarations";

const home = (app: AppContext) => {
  app.usePlugin(pluginName, new HomePlugin(app));
  console.log("Home plugin initialized");
};

export const pluginName = "home";

class HomePlugin implements IPlugin {
  name = "";
  description = "";
  version = "0.0.1";
  /**
   *
   */
  constructor(app: AppContext) {}
  routes(route: DefineRouteFunction) {
    route("", "Home/routes/layout.tsx", () => {
      route("", "Home/routes/index.tsx", { index: true });
    });
  }
}

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: HomePlugin;
  }
}

export default home;
