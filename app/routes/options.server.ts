import { json, LoaderFunctionArgs } from "@remix-run/node";
import { OptionModel } from "../core/options/models/option.modelmodel";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const name = url.searchParams.get("name");

  const query: { name?: string } = {};

  if (name) query.name = name;
  const options = await OptionModel.find(query);

  return json({ options });
};
