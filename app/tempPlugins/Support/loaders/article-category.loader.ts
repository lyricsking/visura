import { LoaderFunction, json } from "@remix-run/node";
import { getArticlesCategory } from "../data/articles";

export const loader: LoaderFunction = async ({ params }) => {
  const category = await getArticlesCategory(parseInt(params.categoryId || ""));

  return json({ category });
};
