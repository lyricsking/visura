import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { IPlugin } from "../../core/plugin";

export const pluginPath = "blog";

const blogPlugin: IPlugin = {
  name: pluginPath,
  version: "0.0.1",
  defaultConfig: {
    path: "",
  },
  registerRoutes: (path, defineRoute: DefineRouteFunction) => {
    defineRoute(path, "layouts/default.tsx", () => {
      defineRoute("", "plugins/blog/routes/index.tsx", { index: true });
    });
  },
};

export default blogPlugin;
