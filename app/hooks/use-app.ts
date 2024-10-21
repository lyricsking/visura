import { useState } from "react";
import { appContext, AppContext } from "~/app";

export const useApp = async () => {
  const [app, setApp] = useState<AppContext>();

  let newAppContext = await appContext;
  if (newAppContext) {
    setApp(newAppContext);
  }
  
  return app;
};
