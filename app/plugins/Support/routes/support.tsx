import { useLoaderData } from "@remix-run/react";
import { loader } from "../loaders/index.loader";
import { HandleObjectType } from "./layout";
import { ContactForm } from "../components/contact-form";
import { Faqs } from "../components/faqs";
import { SupportArticle } from "../components/support-article";
import { action } from "../actions/support.action";

export { loader };
export { action };

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
      <SupportArticle categories={articleCategories} />

      {/* FAQs Section */}
      <Faqs faqs={faqs} />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
