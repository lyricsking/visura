import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { loader } from "../loaders/article-category.loader";

export { loader };

export default function ArticlesByCategory() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{"category.name"}</h1>
          <p className="text-gray-600">{"category.description"}</p>
          <Link to="/support" className="text-blue-500 underline mt-2 block">
            Back to Categories
          </Link>
        </header>

        <ul className="list-disc list-inside">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                to={`/support/article/${article.id}`}
                className="text-blue-500 underline"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {articles.map((article: any) => (
              <div key={article.id} className="mt-4">
                <Link
                  to={`article/${article.id}`}
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
    </>
  );
}
