import { json, LoaderFunctionArgs } from "@remix-run/node";
import { PluginModel } from "../models/plugin.model";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const query = new URL(request.url).searchParams;

  const plugins = await PluginModel.find({});
  return json({ plugins });
};
