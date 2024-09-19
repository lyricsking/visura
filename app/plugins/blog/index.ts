import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { IPlugin } from "../../core/plugin";

export const blogPath = "";

const blogPlugin: IPlugin = {
  name: "blog",
  description: "",
  version: "0.0.1",
  defaultConfig: {
    path: blogPath,
  },
  registerRoutes: (path, defineRoute: DefineRouteFunction) => {
    defineRoute(path, "layouts/default.tsx", () => {
      defineRoute("", "plugins/blog/routes/index.tsx", { index: true });
      defineRoute(":slug", "plugins/blog/routes/post.tsx");
      defineRoute("tips/:slug", "plugins/blog/routes/tip.tsx");
      //defineRoute("upload", "Dashboard/routes/upload.tsx", {
      //  id: "upload-blog",
      //});
    });
  },
};

export default blogPlugin;
