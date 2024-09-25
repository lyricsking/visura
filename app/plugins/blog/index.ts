import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import config, { Config } from "../../config";
import { List, NewspaperIcon } from "lucide-react";
import { IPlugin } from "~/plugin";
import { Route, RouteType, addRoute } from "~/actions/route.action";

const blogPlugin: IPlugin = {
  name: "blog",
  description: "",
  version: "0.0.1",
  onInit() {
    routes["app"].forEach((route) => {
      addRoute("app", route);
    });

    routes["admin"].forEach((route) => {
      addRoute("admin", route);
    });
  },
  onDestroy() {},
};

export default blogPlugin;

const routes: Record<RouteType, Route[]> = {
  app: [],
  admin: [],
};

/*defineRoute(pluginConfig.path, "layouts/Default.tsx", () => {
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
    */
