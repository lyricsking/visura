import { IPlugin } from "~/plugin";
import { blogLoader as blogLoader } from "./loaders/index.loader";
import { loader as postLoader } from "./loaders/post.loader";
import { loader as tipLoader } from "./loaders/tip.loader";
import { ListIcon, LucideLayoutDashboard } from "lucide-react";
import { loader as adminBlogLoader } from "./server/blog.server";
import { loader as editPostLoader } from "./server/edit.server";
import { Route, RouteType } from "~/app";

const blogPlugin: IPlugin = {
  id: "blog",name: "Blog Plugin",
  description: "",
  version: "0.0.1",
  onInit(app) {
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
  admin: [
    {
      path: "/administration/blog",
      component: "plugins/blog/routes/admin/posts.tsx",
      loader: adminBlogLoader,
    },
    {
      path: "/administration/blog/edit",
      component: "plugins/blog/routes/admin/edit.tsx",
      loader: editPostLoader,
    },
  ],
};

    app.addMenu("admin", {
      id: "blog",
      path: "/administration/blog",
      label: "Blog",
      //   icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFjdGl2aXR5Ij48cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIvPjwvc3ZnPg==",
      icon: "lucide-ListIcon",
    });

    app.addRouteMenu("/administration/blog", {
      id: "/administration/blog/edit",
      path: "/administration/blog/edit",
      label: "Create Post",
    });
  },
  onDestroy() {},
};

export default blogPlugin;


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
