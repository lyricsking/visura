import { appContext, AppContext } from "~/app";
import { singleton } from "./singleton";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Config } from "~/core/config";

type ContextLoaderFunctionArgs = LoaderFunctionArgs & {
  app: AppContext;
};

export async function withContext(): Promise<AppContext | undefined> {
  // singleton("mongoose", createDBConnection);
  const context = await appContext;
  if (!context) return undefined;
  return context;
}
