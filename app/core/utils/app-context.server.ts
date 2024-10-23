import { AppContext } from "~/app";
import { loadPlugins } from "~/plugin";
import { singleton } from "./singleton";

export const getAppContext = async () => {
  // Todo Implement debounce
  const app = singleton("app", () => {
    const app = new AppContext();
    // Load plugins
    app.init(loadPlugins);

    return app;
  });

  return app;
};
