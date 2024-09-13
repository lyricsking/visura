import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { AppContext } from "~/core/app";
import { IPlugin } from "~/core/declarations";

export const pluginName = "blog";

let appContext: AppContext;

const blogPlugin: IPlugin = {
  name: "",
  description: "",
  version: "",
  path: "",
  init: function (app: AppContext): void {
    appContext = app;

    routes(this.path, appContext);
  },
};

const blog = (app: AppContext) => {
  app.usePlugin(pluginName, blogPlugin);
};

const routes = (path: string, app: AppContext) => {
  app.route(path, "layouts/default.tsx", () => {
    app.route("", "plugins/Blog/routes/index.tsx", { index: true });
  });
};

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: typeof blogPlugin;
  }
}

export default blog;
