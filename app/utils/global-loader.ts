import AppContext from "~/app";
import { singleton } from "./singleton";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Config } from "~/config";

// Higher-order function to wrap the loader and pass config
export function withConfig(
  callback: (
    args: LoaderFunctionArgs,
    config: any,
    app?: AppContext
  ) => Promise<Response> | Response
): LoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    const appContext = await singleton<AppContext>("app");
    let appConfig: Config["app"] = {} as Config["app"];
    if (appContext) appConfig = appContext.configs;

    // Pass the config to the callback and return the final response
    return callback(args, appConfig || {}, appContext);
  };
}
