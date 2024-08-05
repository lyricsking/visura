import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getArticlesByCategory } from ".";

export const loader: LoaderFunction = async ({ params }) => {
  const articles = await getArticlesByCategory(
    parseInt(params.categoryId || "")
  );
  return { articles };
};

export default function ArticlesByCategory() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {articles.map((article: any) => (
            <div key={article.id} className="mt-4">
              <Link
                to={`/articles/details/${article.id}`}
                className="text-lg font-medium text-green-500"
              >
                {article.title}
              </Link>
              <p className="mt-1 text-sm text-gray-600">
                {article.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
