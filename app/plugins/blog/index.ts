import {type  PluginImpl, PluginOptions } from "~/shared/types/plugin";
import Blog, { blogLoader } from "./routes/blog";

export default class BlogPlugin implements PluginImpl {
  readonly path = ""; // Path to load the plugin from; used to load plugin from internal or external host
  readonly name = "Blog";
  readonly displayName = "Blog";
  readonly description = "";
  readonly options?: PluginOptions | undefined;
  readonly version = "0.0.1";

  readonly routes = [
    {
      // id: new Types.ObjectId("app/plugins/blog"),
      path: "/blog",
      loader: blogLoader,
      metadata: { title: "Blog", description: "" },
      content: {
        type: "block",
        value: Blog,
      },
    },
  ];
  readonly settings: PluginOptions = {};

  // constructor({ version, settings }: any) {
  //   this.settings = {
  //     ...settings,
  //     routes: this.settings.routes,
  //   };
  //   this.version = version;
  // }

  // module(app: AppContext) {
  //   app.addMenu("admin", {
  //     id: "blog",
  //     path: "blog",
  //     label: "Blog",
  //     //   icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFjdGl2aXR5Ij48cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIvPjwvc3ZnPg==",
  //     icon: "lucide-ListIcon",
  //   });

  //   app.addRouteMenu("/administration/blog", {
  //     id: "blog-edit",
  //     path: "blog/edit",
  //     label: "Create Post",
  //   });
  // }
}
