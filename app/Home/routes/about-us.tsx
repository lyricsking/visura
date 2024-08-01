
export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Story 
        </h2>
        <p className="mt-4 text-gray-600">
          YourBrand was founded with the mission to provide the best wellness supplements to our customers. Our journey started in [Year] with a small team and a big dream. Today, we are proud to serve thousands of happy customers.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
        <p className="mt-4 text-gray-600">
          Our team is composed of passionate professionals dedicated to your health and wellness.
        </p>
        {/* Include key team members here if applicable */}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
        <p className="mt-4 text-gray-600">You can reach us at:</p>
        <address className="mt-4 not-italic">
          <p className="text-gray-600">YourBrand</p>
          <p className="text-gray-600">123 Wellness Street</p>
          <p className="text-gray-600">Health City, Wellness State, 12345</p>
          <p className="text-gray-600">Phone: (123) 456-7890</p>
          <p className="text-gray-600">Email: <a href="mailto:support@yourbrand.com" className="text-green-500 hover:underline">support@yourbrand.com</a></p>
        </address>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Find Us</h2>
        <div className="mt-4">
          {/* Embed Google Maps iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.085695636765!2d-122.08424968469162!3d37.4219997798217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24a5d0e6bc1%3A0xa3b576fb4f4a8b15!2sGoogleplex!5e0!3m2!1sen!2sus!4v1598393162331!5m2!1sen!2sus"
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      </section>
    </div>
  );
}
