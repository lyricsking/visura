import { useLoaderData } from 'remix';
import { getArticleDetails } from '~/utils/supportUtils';

export const loader = async ({ params }) => {
  const article = await getArticleDetails(params.articleId);
  return { article };
};

export default function ArticleDetails() {
  const { article } = useLoaderData();

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