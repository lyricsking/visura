import { createContext, ReactNode, useContext } from "react";
import { serverOnly$ } from "vite-env-only/macros";
import { AppContext } from "~/app";
import { loadPlugins } from "~/plugin";
import { singleton } from "./singleton";

const ClientAppContext = createContext<AppContext | undefined>(undefined);

type AppContextProviderProps = {
  appContext: AppContext;
  children: ReactNode;
};

export default function AppContextProvider({
  appContext,
  children,
}: AppContextProviderProps) {
  return (
    <ClientAppContext.Provider value={appContext}>
      {children}
    </ClientAppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(ClientAppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }

  return context;
}

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
