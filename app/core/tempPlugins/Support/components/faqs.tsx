type FaqsProps = {
  faqs: any;
};

export function Faqs({ faqs }: FaqsProps) {
  const firstColumn = faqs.filter((_, index) => index % 4 === 0);
  const secondColumn = faqs.filter((_, index) => index % 4 === 1);
  const thirdColumn = faqs.filter((_, index) => index % 4 === 2);
  const fourthColumn = faqs.filter((_, index) => index % 4 === 3);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5 sm:p-6">
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
  );
}