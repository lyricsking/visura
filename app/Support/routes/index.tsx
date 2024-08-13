import { Link, 
  useFetcher
,useLoaderData, useOutletContext } from "@remix-run/react";
import Button from "~/components/button";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";
import { loader } from "../loaders/index.loader";
import { Ref } from "react";
import { HandleObjectType } from "./layout";

export { loader };

export const handle: HandleObjectType = {
  getHeaderObject: (data: typeof loader) => {
    return {
      title: "Support Center",
      description: "How can we assist you today?",
    };
  },
};

export default function Support() {
  const { articleCategories, faqs } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      {/* Support Articles Section */}
      
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
      <ContactForm />
    </div>
  );
}
