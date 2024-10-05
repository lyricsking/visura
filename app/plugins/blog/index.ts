import { IPlugin } from "~/plugin";
import { Route, RouteType } from "~/actions/route.action";
import { blogLoader as blogLoader } from "./loaders/index.loader";
import { loader as postLoader } from "./loaders/post.loader";
import { loader as tipLoader } from "./loaders/tip.loader";

const blogPlugin: IPlugin = {
  name: "blog",
  description: "",
  version: "0.0.1",
  onInit(app) {
    routes["app"].forEach((route) => {
      app.addRoute("app", route);
    });

    routes["admin"].forEach((route) => {
      app.addRoute("admin", route);
    });
  },
  onDestroy() {},
};

export default blogPlugin;

const routes: Record<RouteType, Route[]> = {
  app: [
    {
      path: "/blog",
      component: "blog/routes/blog.tsx",
      loader: blogLoader,
    },
    {
      path: "/news/:slug",
      component: "blog/routes/post.tsx",
      loader: postLoader,
    },
    {
      path: "/tips/:slug",
      component: "blog/routes/tip.tsx",
      loader: tipLoader,
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
