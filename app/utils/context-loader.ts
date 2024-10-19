import AppContext from "~/app";
import { singleton } from "./singleton";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Config } from "~/config";
import createDBConnection from "~/database/db.server";

type ContextLoaderFunctionArgs = LoaderFunctionArgs & {
  app: AppContext;
};

// Higher-order function to wrap the loader and pass app context
export function withContext(
  callback: (params: ContextLoaderFunctionArgs) => Promise<Response> | Response
): LoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    singleton("mongoose", createDBConnection);
    const appContext = await singleton<AppContext>("app", async () => {
      const app = new AppContext();
      //await app.init();
      if (app) await app.init();
      return app;
    });

    if (!appContext) return null;

    // Pass the config to the callback and return the final response
    return callback({ ...args, app: appContext });
  };
}
