import { createContext, ReactNode, useContext } from "react";
import { AppContext } from "~/app";

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

// export function useAppContext() {
//   const context = useContext(ClientAppContext);

//   if (!context) {
//     throw new Error("useAppContext must be used within AppContextProvider");
//   }

//   return context;
// }
