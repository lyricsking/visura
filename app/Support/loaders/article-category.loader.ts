import { LoaderFunction, json } from "@remix-run/node";
import { getArticlesByCategory } from "./index.loader";

export const loader: LoaderFunction = async ({ params }) => {
  const articles = await getArticlesByCategory(
    parseInt(params.categoryId || "")
  );

  return json({ articles });
};
