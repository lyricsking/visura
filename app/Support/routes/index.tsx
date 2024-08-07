import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";

export default function Support() {
  const { articleCategories, faqs } = useLoaderData<typeof loader>();

  return (
    <>
      <div className=" bg-gray-300 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="mt-2 text-lg text-gray-700">
          How can we assist you today?
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        {/* Support Articles Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Support Articles
          </h2>
          <div className="mt-6 bg-white shadow rounded-lg">
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
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 bg-white shadow rounded-lg">
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
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Contact Us
          </h2>
          <div className="mt-6 bg-white shadow rounded-lg p-6 space-y-6 ">
            <form
              method="post"
              action="/submit-contact"
              className="flex flex-col gap-4 max-w-xl mx-auto"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input type="text" name="name" required className="mt-1 " />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input type="email" name="email" required className="mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input type="text" name="subject" required className="mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea name="message" required className="mt-1" rows={4} />
              </div>
              <Button
                type="submit"
                radius="md"
                className="text-white bg-green-500"
              >
                Submit
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
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
