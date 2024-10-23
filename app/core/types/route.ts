import { AppContext } from "~/app";
import { Page } from "./page";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

interface PluginLoaderFunctionArgs extends LoaderFunctionArgs {
  app: AppContext;
}
export type PluginLoaderFunction = (
  args: PluginLoaderFunctionArgs
) => Promise<Response> | any; // Adjust the return type as necessary

interface PluginActionFunctionArgs extends ActionFunctionArgs {
  app: AppContext;
}
export type PluginActionFunction = (
  args: PluginActionFunctionArgs
) => Promise<Response | any>; // Adjust the return type as necessary

export type RouteType = "app" | "admin";
export interface Route {
  path: string;
  page: Page;
}

export interface ServerFn {
  path: string;
  action: PluginActionFunction;
  loader: PluginLoaderFunction;
}
