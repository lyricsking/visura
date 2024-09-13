import {
  DefineRouteFunction,
  DefineRouteOptions,
} from "@remix-run/dev/dist/config/routes";
import config from "~/config";
import { AppContext } from "./app";

export interface IPlugin {
  name: string;
  description: string;
  version: string;
  path: string;
  headerIcon?: React.ElementType;
  /**
   * A list of plugin routes that should be available __externally__ to clients
   */
  routes(defineRoute: DefineRouteFunction): void;
}

export type PluginInitializer = (app: AppContext) => void;
// A mapping of plugin names to types. Will be extended
// in individual plugin files
export interface PluginTypes {}

/**
 * Options that can be passed when registering a service via `app.use(name, service, options)`
 */
export interface PluginOptions {
  enabled?: boolean;
  path: string;
  /**
   * A list of custom events that this service emits to clients
   */
  //   events?: string[] | readonly string[]
  /**
   * A list of plugin routes that should be available __externally__ to clients
   */
  routes?: (defineRoute: DefineRouteFunction) => void;
  /**
   * Provide a full list of events that this service should emit to clients.
   * Unlike the `events` option, this will not be merged with the default events.
   */
  //   serviceEvents?: string[] | readonly string[]
  /**
   * Initial data to always add as route params to this service.
   */
  //   routeParams?: { [key: string]: any }
}
