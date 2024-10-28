import { json, LoaderFunctionArgs } from "@remix-run/node";
import { PluginModel } from "../core/plugin/models/plugin.model";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const isActive = url.searchParams.get("isActive") === "true";

  const query: { isActive?: boolean } = {};

  if (isActive) query.isActive = isActive;

  const plugins = await PluginModel.find(query);
  return json({ plugins });
};
