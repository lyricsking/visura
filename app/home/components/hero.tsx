import { Link } from "@remix-run/react";

export default function Hero() {
  return (
    <div className="px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-3xl py-20 sm:py-32 lg:py-40">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {
              //Put your home and office essentials on replay
            }
            Build an online home for everything else
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">
            {/*Linked lets offers weekly deliveries of your reqular used home and
            offices essentials withoit having to spending time sorting them out.
            Spend less time shopping.
            */}
            Create a consistent mobile-friendly online presence for yourself. Be
            it a portfolio portal, landing or product page, mini-website or just
            list of links to important resources.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to=""
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
            <Link
              to=""
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
