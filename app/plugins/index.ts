import { AppContext } from "../core/app";
import blog from "./Blog";

/**
 * Checks which plugins are enabled and dynamically loads them
 * @returns
 */
export const plugins = async (app: AppContext) => {
  // app.configure(home);
  app.configure(blog);
  // app.configure(subscription);
};
