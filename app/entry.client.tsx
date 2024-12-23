/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { AppContext, getAppContext } from "./app";
import AppContextProvider from "./shared/providers/app.provider.tsx";

async function initializeAppContext(): Promise<AppContext> {
  // Init app context
  return getAppContext();
}

initializeAppContext().then((app) => {
  startTransition(() => {
    hydrateRoot(
      document,
      <AppContextProvider appContext={app}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </AppContextProvider>
    );
  });
});
