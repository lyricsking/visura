import { Types } from "mongoose";

export interface OpenGraphTag {
  property: string;
  content: string;
}

export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string;
  openTags?: OpenGraphTag[];
}

export const PageContentType = [
  "block",
  "component",
  "markdown",
  "yaml",
] as const;
export type PageContentType = (typeof PageContentType)[number];

export interface PageContent {
  type: PageContentType;
  value: any; // YAML configuration for type "yaml", React Components for "component" type
}
import { AppContext } from "~/app";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

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

export const PageStatus = {
  draft: "draft",
  published: "published",
  archived: "archived",
} as const;
export type PageStatus = (typeof PageStatus)[keyof typeof PageStatus];

export const TemplateType = {
  none: "none",
  public: "public",
  owned: "owned",
} as const;
export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];

export interface IPage {
  _id: Types.ObjectId;
  path?: string;
  default?: boolean;
  metadata: PageMetadata;
  content: PageContent;
  action?: PluginActionFunction;
  loader?: PluginLoaderFunction;
  createdBy: Types.ObjectId;
  isTemplate?: TemplateType;
  status: PageStatus;
}

export type IPageWithOptionalId = Omit<IPage, "_id"> & { _id?: Types.ObjectId };
