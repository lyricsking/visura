import {
  json,
  LinkDescriptor,
  LinksFunction,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import pkg from "../../package.json";
import Hero from "./components/hero";
import HomeCarousel from "./components/home.carousel";
import Explanation from "./components/explanation";
import { buttonVariants } from "~/shared/components/button";
import { cn } from "~/shared/utils";
import { findFontByName } from "~/shared/data/fonts";

export const links: LinksFunction = () => {
  const merriweather = findFontByName("Playfair Display");
  const raleway = findFontByName("Raleway");

  let links = [];

  if (merriweather)
    links.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links.push({ rel: raleway.rel, href: raleway.href });

  return links;
};

export const meta: MetaFunction = () => {
  return [
    { title: pkg.name },
    { name: "description", content: pkg.description },
  ];
};
//style={{ fontFamily: font.value }}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  return json({ q });
};

export default function Home() {
  const { q } = useLoaderData<typeof loader>();

  const getStartedButtonCn = buttonVariants({
    radius: "full",
    variant: "outline",
    size: "lg",
  });

  return (
    <div className="w-full">
      <HomeCarousel />
      <Hero />
      <hr className="border-t" />
      <Explanation />
      <Link
        to="/quiz"
        className={cn(
          getStartedButtonCn,
          "flex items-center justify-center mx-auto",
          "text-xl capitalize",
          "border-2",
          "-mt-8 mb-8 max-w-[70%] h-16"
        )}
      >
        start quiz
      </Link>
    </div>
  );
}
