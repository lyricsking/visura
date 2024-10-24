/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { AppContext } from "./app";
import { loadPlugins } from "./plugin";
import AppContextProvider from "./core/utils/app-context";

async function initializeAppContext(): Promise<AppContext> {
  // Init app context
  const app = new AppContext();
  await app.init(loadPlugins);

  return app;
}

initializeAppContext().then((app) => {
  startTransition(() => {
    hydrateRoot(
      document,
      <AppContextProvider appContext={app}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </AppContextProvider>
    );
  });
});
