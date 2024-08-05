// routes/support.tsx

import { Link, useLoaderData } from "@remix-run/react";

export default function Support() {
  const { articleCategories, faqs } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
      <p className="mt-2 text-lg text-gray-600">How can we assist you today?</p>

      {/* Support Articles Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Support Articles</h2>
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {articleCategories.map((category) => (
              <div key={category.id} className="mt-4">
                <Link
                  to={`articles/${category.id}`}
                  className="text-lg font-medium text-green-500"
                >
                  {category.name}
                </Link>
                <p className="mt-1 text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="mt-4">
                <details
                  name="faqs"
                  className="border border-gray-200 rounded-md p-4"
                >
                  <summary className="font-medium text-gray-900 cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
        <form
          method="post"
          action="/submit-contact"
          className="mt-6 bg-white shadow sm:rounded-lg p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={4}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// Dummy data and utilities for demonstration
export const getFAQs = async () => {
  return [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Orders' section.",
    },
    {
      id: 2,
      question: "How do I return a product?",
      answer:
        "You can return a product by visiting our 'Returns' page and following the instructions provided.",
    },
  ];
};

export const getArticleCategories = async () => {
  return [
    {
      id: 1,
      name: "Using Our Product",
      description: "Guides and tips for using our products effectively.",
    },
    {
      id: 2,
      name: "Troubleshooting",
      description: "Solutions to common issues you might encounter.",
    },
  ];
};

export const getArticlesByCategory = async (categoryId?: number) => {
  const allArticles = [
    {
      id: 1,
      categoryId: 1,
      title: "Getting Started with Our Product",
      content: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 2,
      categoryId: 2,
      title: "Fixing Connection Issues",
      content: "Lorem ipsum dolor sit amet...",
    },
  ];
  return allArticles.filter((article) => article.categoryId === categoryId);
};

export const getArticleDetails = async (id: any) => {
  const allArticles = await getArticlesByCategory();
  return allArticles.find((article) => article.id === parseInt(id));
};

export const loader = async () => {
  const articleCategories = await getArticleCategories();
  const faqs = await getFAQs();
  return { articleCategories, faqs };
};
