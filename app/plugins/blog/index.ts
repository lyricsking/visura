import { IPlugin } from "~/plugin";
import { Route, RouteType, addRoute } from "~/actions/route.action";
import { loader as blogLoader } from "./loaders/index.loader";
import { loader as postLoader } from "./loaders/post.loader";
import { loader as tipLoader } from "./loaders/tip.loader";

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
  app: [
    {
      path: "/blog",
      file: "blog/routes/blog.tsx",
      loader: blogLoader,
    },
    {
      path: "/news/:slug",
      file: "blog/routes/post.tsx",
      loader: postLoader,
    },
    {
      path: "/tips/:slug",
      file: "blog/routes/tip.tsx",
      loader: postLoader,
    },
  ],
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
