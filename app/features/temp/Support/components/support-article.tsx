import { Link } from "@remix-run/react";

type SupportArticleProps = {
  categories: any;
};

export function SupportArticle({ categories }: SupportArticleProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Support Articles
      </h2>
      <div className="mt-6 bg-white shadow rounded-lg">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="border p-4 rounded-lg focus-within:ring-2 focus-within:ring-blue-500"
            >
              <Link
                to={`articles/${category.id}`}
                className="block focus:outline-none"
              >
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
