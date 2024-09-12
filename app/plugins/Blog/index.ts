import { IPlugin } from "~/core/plugins";
import BlogPlugin from "./blog.class";
import { AppContext } from "~/core/core";

export const pluginName = "blog";

const blog = (app: AppContext) => {
  app.use(pluginName, new BlogPlugin(app));
};

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: BlogPlugin;
  }
}
