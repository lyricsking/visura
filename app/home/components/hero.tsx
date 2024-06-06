import { Link } from "@remix-run/react";
import { Carousel } from "~/shared/components/carousel";

export default function Hero() {
  return (
    <div className="px-6 pt-10 lg:px-8">
      <div className="mx-auto max-w-3xl py-6 sm:py-8 lg:py-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        ></Carousel>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {
              //Put your home and office essentials on replay
            }
            Take control of your health life.
          </h1>
          <p className="mt-4 text-xl leading-7 text-gray-600">
            Get personalized health and wellness packs picked and delivery to
            you.
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
