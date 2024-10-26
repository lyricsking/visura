import { Types } from "mongoose";

export interface PageMetadata {
  title: string;
  [key: string]: any;
}

export interface PageContentType {
  type:
    | "block"
    /*  |  "text" | "image" */
    | "markdown"
    | "component";
  value: any;
}
import { AppContext } from "~/app";
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

export interface IPage {
  path: string;
  metadata: PageMetadata;
  content: PageContentType;
  action?: PluginActionFunction;
  loader?: PluginLoaderFunction;
}
