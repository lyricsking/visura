import { IPlugin } from "~/plugin";
import { Route, RouteType } from "~/actions/route.action";
import { blogLoader as blogLoader } from "./loaders/index.loader";
import { loader as postLoader } from "./loaders/post.loader";
import { loader as tipLoader } from "./loaders/tip.loader";
import { ListIcon } from "lucide-react";

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

    app.addMenu("admin", {
      id: "blog",
      path: "plugins/blog/routes/blog.tsx",
      label: "Blog",
      //   icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFjdGl2aXR5Ij48cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIvPjwvc3ZnPg==",
      icon: "lucide-ListIcon",
    });
  },
  onDestroy() {},
};

export default blogPlugin;

const routes: Record<RouteType, Route[]> = {
  app: [
    {
      path: "/blog",
      component: "plugins/blog/routes/blog.tsx",
      loader: blogLoader,
    },
    {
      path: "/news/:slug",
      component: "plugins/blog/routes/post.tsx",
      loader: postLoader,
    },
    {
      path: "/tips/:slug",
      component: "plugins/blog/routes/tip.tsx",
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
