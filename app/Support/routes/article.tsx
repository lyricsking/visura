import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { loader } from "../loaders/article.loader";

export { loader };

export function SupportArticlePage() {
  const { articleId } = useParams();
  const article = {
    id: articleId,
    title: "How to Get Started with Our Platform",
    content: `<p>Welcome to our platform. To get started, you'll need to do the following:</p>
              <ol>
                <li>Create an account.</li>
                <li>Verify your email.</li>
                <li>Set up your profile.</li>
              </ol>
              <p>If you need further assistance, contact our support team.</p>`,
    relatedArticles: [
      { id: 2, title: "Account Setup and Verification" },
      { id: 3, title: "Managing Your Profile" },
    ],
  };

  return (
    <article className="container mx-auto p-4 max-w-3xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <Link to="/support" className="text-blue-500 underline">
          Back to Support Categories
        </Link>
      </header>

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

export default function ArticleDetails() {
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
