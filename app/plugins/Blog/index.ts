import { AppContext } from "~/core/app";
import { BlogPlugin } from "./blog.class";

export const pluginName = "blog";

const blog = (app: AppContext) => {
  app.usePlugin(pluginName, new BlogPlugin(app), {
    enabled: true,
    path: "",
  });
  console.log("Blog plugin initialized");
};

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: BlogPlugin;
  }
}

export default blog;
