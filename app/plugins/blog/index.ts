import { IPlugin } from "~/core/types/plugin";
import Blog from "./src/routes/blog";
import { blogLoader } from "./src/loaders/index.loader";

const blogPlugin: IPlugin = {
  id: "blog",
  name: "Blog",
  description: "",
  version: "0.0.1",
  onInit(app) {
    app.addRoute("app", {
      path: "blog",
      loader: blogLoader,
      page: {
        id: "blog",
        metadata: { title: "Blog", description: "" },
        content: [
          {
            type: "component",
            value: Blog,
          },
        ],
      },
    });

    // app.addRoute("app", {
    //   path: "news/:slug",
    //   getBlock: () => ({} as any),
    // });
    // app.addRoute("app", {
    //   path: "tips/:slug",
    //   getBlock: () => ({} as any),
    // });
    // app.addRoute("admin", {
    //   path: "blog",
    //   getBlock: () => ({} as any),
    // });
    // app.addRoute("admin", {
    //   path: "blog/edit",
    //   getBlock: () => ({} as any),
    // });
    // app.addMenu("admin", {
    //   id: "blog",
    //   path: "blog",
    //   label: "Blog",
    //   //   icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFjdGl2aXR5Ij48cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIvPjwvc3ZnPg==",
    //   icon: "lucide-ListIcon",
    // });
    // app.addRouteMenu("/administration/blog", {
    //   id: "blog-edit",
    //   path: "blog/edit",
    //   label: "Create Post",
    // });
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
