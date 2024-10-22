import { Page } from "./page";

export type PluginLoaderFunction = (
  app: AppContext
) => (args: any) => Promise<any> | any; // Adjust the return type as necessary

export type PluginActionFunction = (
  app: AppContext
) => (args: any) => Promise<Response | any>; // Adjust the return type as necessary

export type RouteType = "app" | "admin";
export interface Route {
  path: string;
  loader?: () => Promise<PluginLoaderFunction>;
  action?: () => Promise<any>
  page: Page,
}