import { json, LoaderFunctionArgs } from "@remix-run/node";
import { PageModel } from "../models/page.model";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");

  const query: { path?: string } = {};

  if (path) query.path = path;
  const pages = await PageModel.find(query);

  return json({ pages });
};
