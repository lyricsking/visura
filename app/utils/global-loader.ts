import AppContext from "~/app";
import { singleton } from "./singleton";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

// Higher-order function to wrap the loader and pass config
export function withConfig(
  callback: (
    args: LoaderFunctionArgs,
    config: any
  ) => Promise<Response> | Response
): LoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    const appContext = await singleton<AppContext>("app");
    let appConfig = null;
    if (appContext) appConfig = appContext.get("appName");

    // Pass the config to the callback and return the final response
    return callback(args, appConfig);
  };
}
