import { appContext, AppContext } from "~/app";
import { singleton } from "./singleton";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Config } from "~/core/config";

type ContextLoaderFunctionArgs = LoaderFunctionArgs & {
  app: AppContext;
};

// Higher-order function to wrap the loader and pass app context
export function withContext(
  callback: (params: ContextLoaderFunctionArgs) => Promise<Response> | Response
): LoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    // singleton("mongoose", createDBConnection);
    const context = await appContext;
    if (!context) return null;

    // Pass the config to the callback and return the final response
    return callback({ ...args, app: context });
  };
}
