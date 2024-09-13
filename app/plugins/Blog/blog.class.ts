import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { ElementType, JSX } from "react";
import { AppContext } from "~/core/app";
import { IPlugin } from "~/core/declarations";

export class BlogPlugin implements IPlugin {
  name = "";
  description = "";
  version = "";
  path = "";
  headerIcon?: ElementType<any, keyof JSX.IntrinsicElements> | undefined;
  constructor(app: AppContext) {}
  routes(defineRoute: DefineRouteFunction) {
    defineRoute(this.path, "layouts/default.tsx", () => {
      defineRoute("", "plugins/Blog/routes/index.tsx", { index: true });
    });
  }
}
