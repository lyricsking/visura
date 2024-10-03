import { PluginLoaderFunction } from "~/actions/route.action";
import { findTipBySlug } from "../server/tips.server";

export const loader: PluginLoaderFunction = async ({ params }) => {
  let slug = params["slug"];
  if (!slug) throw Error("Tip id must be provided.");

  let tip = await findTipBySlug({ slug });
  console.log(tip);

  if (!tip.data) throw Error("No tip was found with such.");

  return { tip: tip.data };
};