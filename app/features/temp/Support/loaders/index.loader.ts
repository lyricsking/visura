import { LoaderFunction, json } from "@remix-run/node";
import { getArticleCategories, getFAQs } from "../data/articles";

export const loader: LoaderFunction = async () => {
  const articleCategories = await getArticleCategories();
  const faqs = await getFAQs();
  return json({ articleCategories, faqs });
};
