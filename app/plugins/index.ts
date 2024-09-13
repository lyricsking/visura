import { AppContext } from "~/core/app";
import blog from "./Blog";
import home from "./Home";
import subscription from "./SubscriptionBox";

/**
 * Checks which plugins are enabled and dynamically loads them
 * @returns
 */
export const plugins = async (app: AppContext) => {
  app.configure(home);
  app.configure(blog);
  app.configure(subscription);
};
