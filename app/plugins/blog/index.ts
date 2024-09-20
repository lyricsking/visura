import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { IPlugin } from "../../core/plugin";
import { PluginSettingsType } from "~/config";

export const blogPath = "";

const blogPlugin: IPlugin<PluginSettingsType> = {
  name: "blog",
  description: "",
  version: "0.0.1",
  defaultConfig: {
    path: blogPath,
  },
  registerRoutes: (
    defineRoute: DefineRouteFunction,
    config: PluginSettingsType
  ) => {
    defineRoute(config.path, "layouts/default.tsx", () => {
      defineRoute("", "plugins/blog/routes/index.tsx", { index: true });
      defineRoute("news/:slug", "plugins/blog/routes/post.tsx");
      defineRoute("tips/:slug", "plugins/blog/routes/tip.tsx");
      //defineRoute("upload", "Dashboard/routes/upload.tsx", {
      //  id: "upload-blog",
      //});
    });
  },
};

export default blogPlugin;
