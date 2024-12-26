import Button, { buttonVariants } from "~/shared/components/button";
import { findFontByName } from "~/shared/utils/fonts";
import { cn } from "~/shared/utils/util";

export default function Hero() {
  const font = findFontByName("Playfair Display");

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 sm:py-12 lg:px-8 lg:py-16">
      <div className="text-center">
        <h1
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          style={{ fontFamily: font!.value }}
        >
          {
            //Put your home and office essentials on replay
          }
          Health is wealth. <br /> Take intentional control of your health life
          today.
        </h1>
        <p className="mt-4 text-lg leading-7 text-gray-600">
          Get personalized health and wellness packs.
          <br /> Curated and delivered, where and when you want it.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            variant="ghost"
            radius="md"
            className="text-white bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {}}
          >
            Get started
          </Button>

          <a
            href="#explanation"
            className={cn(
              buttonVariants({
                variant: "outline",
                radius: "md",
                className: "text-sm font-semibold leading-6 text-gray-900",
              })
            )}
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
