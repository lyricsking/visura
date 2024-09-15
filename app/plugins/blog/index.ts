import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { IPlugin, registerPlugin } from "../../core/plugin";

export const pluginPath = "blog";

const blogPlugin: IPlugin = {
  name: pluginPath,
  registerRoutes: (defineRoute: DefineRouteFunction) => {
    defineRoute(pluginPath, "layouts/default.tsx", () => {
      defineRoute("", "plugins/blog/routes/index.tsx", { index: true });
    });
  },
};

const blog = () => registerPlugin(blogPlugin);

export default blog;
