import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { IPlugin } from "../../core/plugin";
import config, { Config, PluginSettingsType } from "../../config";
import { NewspaperIcon } from "lucide-react";

const blogPlugin: IPlugin<PluginSettingsType> = {
  name: "blog",
  description: "",
  version: "0.0.1",
  defaultConfig: {
    path: "",
  },
  dashboardMenu: [
    {
      id: "blog",
      label: "Blog",
      path: "blog",
      icon: NewspaperIcon,
    },
  ],
  registerRoutes: (
    defineRoute: DefineRouteFunction,
    pluginConfig: PluginSettingsType
  ) => {
    defineRoute(pluginConfig.path, "layouts/Default.tsx", () => {
      defineRoute("", "plugins/blog/routes/index.tsx", { index: true });
      defineRoute("news/:slug", "plugins/blog/routes/post.tsx");
      defineRoute("tips/:slug", "plugins/blog/routes/tip.tsx");
      //defineRoute("upload", "Dashboard/routes/upload.tsx", {
      //  id: "upload-blog",
      //});
    });
    defineRoute(
      config.plugins["dashboard"].settings.path,
      "plugins/dashboard/layouts/Main.tsx",
      { id: "blogAdmin" },
      () => {
        defineRoute("blog", "plugins/dashboard/layouts/Admin.tsx", () => {
          defineRoute("", "plugins/blog/routes/posts.admin.tsx", {
            index: true,
          });
          defineRoute("edit", "plugins/blog/routes/edit.tsx");
        });
      }
    );
  },
};

export default blogPlugin;
