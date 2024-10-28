import { json, LoaderFunctionArgs } from "@remix-run/node";
import { OptionModel } from "../models/option.model";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const options = await OptionModel.find({});
  return json({ options });
};
