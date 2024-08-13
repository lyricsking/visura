import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { loader } from "../loaders/article.loader";
import { OutletContextDataType } from "./layout";

export { loader };

const handle: HandleObjectType = {
  getHeaderObject: ({article}: typeof loader) => {
   return {
      title: article.title,
    }
  }
}

export default function SupportArticle() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <article className="container mx-auto p-4 max-w-3xl">
      <section
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <nav aria-labelledby="related-articles" className="mt-8">
        <h2 id="related-articles" className="text-2xl font-semibold">
          Related Articles
        </h2>
        <ul className="list-disc list-inside mt-2">
          {article.relatedArticles.map((related) => (
            <li key={related.id}>
              <Link
                to={`/support/article/${related.id}`}
                className="text-blue-500 underline"
              >
                {related.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}

export function ArticleDetails() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">{article.content}</p>
        </div>
      </div>
    </div>
  );
}
