import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { ElementType, JSX } from "react";
import { AppContext } from "~/core/app";
import { IPlugin } from "~/core/declarations";

export const pluginName = "blog";

class BlogPlugin implements IPlugin {
  headerIcon?: ElementType<any, keyof JSX.IntrinsicElements> | undefined;
  name = "";
  description = "";
  version = "0.0.1";
  /**
   *
   */
  constructor(app: AppContext) {}
  routes(route: DefineRouteFunction) {}
}

const blog = (app: AppContext) => {
  app.usePlugin(pluginName, new BlogPlugin(app));
  console.log("Blog plugin initialized");
};

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: BlogPlugin;
  }
}

export default blog;
