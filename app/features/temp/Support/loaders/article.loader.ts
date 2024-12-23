import { LoaderFunction, json } from "react-router";
import { getArticleDetails } from "../data/articles";

export const loader: LoaderFunction = async ({ params }) => {
  const article = await getArticleDetails(params.categoryId, params.id);
  return json({ article });
};
