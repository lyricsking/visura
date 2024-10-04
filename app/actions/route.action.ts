import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { singleton } from "~/utils/singleton";
import z from "zod";
export type PluginLoaderFunctionArgs = {
  params: Params;
};

export type PluginLoaderFunction = (args: PluginLoaderFunctionArgs) => any;

export type RouteType = "app" | "admin";
export type Route = {
  path: string;
  file: string;
  loader?: PluginLoaderFunction;
  action?: ActionFunction;
};
