import { useState } from "react";
import AppContext from "~/app";
import { singleton } from "~/utils/singleton";

export const useApp = () => {
  const [app, setApp] = useState<AppContext>();

  singleton<AppContext>("app", async () => {
    const app = new AppContext();
    //await app.init();
    if (app) await app.init();
    return app;
  }).then((app) => {
    setApp(app);
  });

  return {
    app: app,
  };
};
