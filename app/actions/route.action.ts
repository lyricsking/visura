import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { singleton } from "~/utils/singleton";
import z from "zod";
import AppContext from "~/app";
export type PluginLoaderFunctionArgs = {
  app: AppContext;
  params: Params;
};
// Define the interface for the loader function
interface LoaderFunction {
  (app: any): () => Promise<Response | any>; // Adjust the return type as necessary
}

export type PluginLoaderFunction = (args: PluginLoaderFunctionArgs) => any;

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  component: string;
  loader?: PluginLoaderFunction;
  action?: ActionFunction;
};
