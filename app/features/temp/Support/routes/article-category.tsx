import { LoaderFunction } from "react-router";
import { Link, useLoaderData, useOutletContext, useParams } from "react-router";
import { loader } from "../loaders/article-category.loader";
import { HandleObjectType } from "./layout";

export { loader };

export const handle: HandleObjectType = {
  getHeaderObject: ({ category }: any) => {
    return {
      title: category.name,
      description: category.description,
    };
  },
};

export default function SupportArticlesCategory() {
  const { category } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      <div className="mt-6 bg-white shadow rounded-lg">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {category.articles.map((article) => (
            <li
              key={article.id}
              className="border p-4 rounded-lg focus-within:ring-2 focus-within:ring-blue-500"
            >
              <Link
                to={`article/${article.id}`}
                className="text-blue-500 underline"
              >
                {article.title}
              </Link>
              <p
                className="mt-1 text-sm text-gray-600 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
