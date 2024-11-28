import { Types } from "mongoose";

export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  [key: string]: any;
}

export interface PageContentType {
  type: "block" | "component" | "markdown" | "yaml";
  value: any; // YAML configuration for type "yaml", React Components for "component" type
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
  id: Types.ObjectId;
  path: string;
  default?: boolean;
  metadata: PageMetadata;
  content: PageContentType;
  action?: PluginActionFunction;
  loader?: PluginLoaderFunction;
}
