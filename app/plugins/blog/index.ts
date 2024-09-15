import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { AppContext } from "~/core/app";
import { IPlugin } from "~/core/declarations";

export const pluginPath = "blog";

const blogPlugin: IPlugin = {
  name: pluginPath,
  registerRoute: (defineRoute: DefineRouteFunction) => {
    defineRoute(this.name, "layouts/default.tsx", () => {
    defineRoute("", "~/Blog/routes/index.tsx", { index: true });
  });
  }
}

const blog = () => registerPlugin(blogPlugin)

export default blog;