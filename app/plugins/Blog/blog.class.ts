import { AppContext } from "~/core/core";
import { IPlugin } from "~/core/plugins";

export default class BlogPlugin implements IPlugin {
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
