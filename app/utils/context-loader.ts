import AppContext from "~/app";
import { singleton } from "./singleton";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Config } from "~/config";

type ContextLoaderFunctionArgs = LoaderFunctionArgs & {
  app: AppContext;
};

// Higher-order function to wrap the loader and pass app context
export function withContext(
  callback: (params: ContextLoaderFunctionArgs) => Promise<Response> | Response
): LoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    const appContext = await singleton<AppContext>("app");
    if (!appContext) return null;

    // Pass the config to the callback and return the final response
    return callback({ ...args, app: appContext });
  };
}

