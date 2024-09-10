import {
  json,
  LinksFunction,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import pkg from "../../../../package.json";
import Hero from "../components/hero";
import HomeCarousel from "../components/home-carousel";
import Explanation from "../components/explanation";
import { findFontByName } from "~/shared/data/fonts";
import { useQuiz } from "~/plugins/subscription-box/Quiz/utils/quiz.utils";
import Button from "~/components/button";
import { config } from "@/config";

export const links: LinksFunction = () => {
  const merriweather = findFontByName("Playfair Display");
  const raleway = findFontByName("Raleway");

  const links = [];

  if (merriweather)
    links.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links.push({ rel: raleway.rel, href: raleway.href });

  return links;
};

export const meta: MetaFunction = () => {
  return [
    { title: config.appName },
    { name: "description", content: config.description },
  ];
};
//style={{ fontFamily: font.value }}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  return json({ q });
};

export default function Home() {
  const { startQuiz } = useQuiz();

  return (
    <div className="w-full">
      <HomeCarousel />
      <Hero />
      <hr className="border-t" />
      <Explanation />
      <Button
        radius="full"
        variant="outline"
        size="lg"
        className="flex items-center justify-center mx-auto text-xl capitalize border-2 -mt-8 mb-8 max-w-[70%] h-16"
        onClick={() => startQuiz()}
      >
        start quiz
      </Button>
    </div>
  );
}
