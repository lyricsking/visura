import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { loader } from "../loaders/article-category.loader";

export { loader };

export default function ArticlesByCategory() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        <ul className="list-disc list-inside">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                to={`/support/article/${article.id}`}
                className="text-blue-500 underline"
              >
                {article.title}
                <p className="mt-1 text-sm text-gray-600">
                                  {article.content.substring(0, 100)}...
                                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  );
}
