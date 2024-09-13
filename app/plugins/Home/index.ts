import { AppContext } from "~/core/app";
import { HomePlugin } from "./home.class";

export const pluginName = "home";

const home = (app: AppContext) => {
  app.usePlugin(pluginName, new HomePlugin(app));
  console.log("Home plugin initialized");
};

declare module "~/core/declarations" {
  interface PluginTypes {
    [pluginName]: HomePlugin;
  }
}

export default home;
