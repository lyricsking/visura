import { useFetcher } from "@remix-run/react";

export function ContactForm() {
  const fetcher = useFetcher();

  return (
    <section className="mt-12" aria-labelledby="contact-form-heading">
      <h2
        id="contact-form-heading"
        className="text-2xl font-bold text-gray-900 text-center"
      >
        Contact Us
      </h2>
      <div className="mt-6 bg-white shadow rounded-lg p-6 space-y-6">
        <fetcher.Form
          method="post"
          action="/submit-contact"
          className="flex flex-col gap-4 max-w-xl mx-auto"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <Input
              type="text"
              name="subject"
              id="subject"
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <Textarea
              name="message"
              id="message"
              required
              className="mt-1"
              rows={4}
            />
          </div>
          <Button
            type="submit"
            radius="md"
            className="text-white bg-green-500"
          >
            Submit
          </Button>
        </fetcher.Form>
      </div>
    </section>
  );
}
