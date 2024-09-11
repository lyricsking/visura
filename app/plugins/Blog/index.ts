import { Plugin } from "~/core/plugins";

const BlogPlugin: Plugin = {
  name: "Blog",
  description: "",
  version: "0.0.1",
  init: function (): void {
    console.log("Blog plugin initialized");
  },
  routes: (route) => {},
};

export default BlogPlugin;

declare module "~/core/plugins" {
  interface PluginTypes {}
}
