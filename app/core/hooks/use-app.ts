import { useEffect, useState } from "react";
import { appContext, AppContext } from "~/app";

export const useApp = () => {
  const [app, setApp] = useState<AppContext>();

  useEffect(() => {
    appContext.then((cApp) => {
      if (cApp) setApp(cApp);
    });
  }, [appContext]);

  return { app };
};
