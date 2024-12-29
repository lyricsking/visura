/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { AppContext, getAppContext } from "./app";

export let appContext: AppContext;

async function initializeAppContext(): Promise<void> {
  // Init app context
  // "https://3000-lyricsking-subscription-8anendzdz6o.ws-eu117.gitpod.io";
  // "https://ynm7f3-3000.csb.app";
  // "http://localhost:3000"
  appContext = await getAppContext("http://localhost:3000");
  return;
}

initializeAppContext().then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
});
