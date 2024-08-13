import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";
import { loader } from "../loaders/index.loader";
import { OutletContextDataType } from "./layout";
import { Ref } from "react";

export { loader };

export default function Support() {
  const { articleCategories, faqs } = useLoaderData<typeof loader>();

  const { childMetaObjectFn }: OutletContextDataType = useOutletContext();

  if (typeof childMetaObjectFn === "function") {
    childMetaObjectFn({
      title: "Support Center",
      description: "How can we assist you today?",
    });
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      {/* Support Articles Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Support Articles
        </h2>
        <div className="mt-6 bg-white shadow rounded-lg">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {articleCategories.map((category) => (
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
  );
}
