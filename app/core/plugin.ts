import { IPlugin } from "~/core/declarations";
import { AppContext } from "./app";
import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { ElementType, JSX } from "react";

export class Plugin implements IPlugin {
  name: string = "";
  description: string = "";
  version: string = "";
  path: string = "";
  headerIcon?: ElementType<any, keyof JSX.IntrinsicElements> | undefined;
  /**
   *
   */
  constructor(app: AppContext) {}
  routes(defineRoute: DefineRouteFunction): void {
    throw new Error("Method not implemented.");
  }
}
