import { IPlugin } from "~/core/plugins";
import BlogPlugin from "./blog.class";
import { AppContext } from "~/core/core";

export const pluginName = "blog";

class BlogPlugin implements IPlugin {
  /**
   *
   */
  constructor(app: AppContext) {}
  name = "";
  description = "";
  version = "0.0.1";
  init(): void {
    console.log("Blog plugin initialized");
  }
  routes() {}
}

const blog = (app: AppContext) => {
  app.use(pluginName, new BlogPlugin(app));
  console.log('Blog plugin initialized');
}

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: BlogPlugin;
  }
}

export default blog;