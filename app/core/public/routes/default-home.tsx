import {
  LinksFunction,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import Hero from "../components/hero";
import HomeCarousel from "../components/home-carousel";
import Explanation from "../components/explanation";
import Button from "~/core/components/button";
import { findFontByName } from "~/core/utils/fonts";

export const links: LinksFunction = () => {
  const merriweather = findFontByName("Playfair Display");
  const raleway = findFontByName("Raleway");

  const links = [];

  if (merriweather)
    links.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links.push({ rel: raleway.rel, href: raleway.href });

  return links;
};

// export const meta: MetaFunction = () => {
//   return [
//     { title: config.app.appName },
//     { name: "description", content: config.app.description },
//   ];
// };
//style={{ fontFamily: font.value }}

export default function DefaultHome() {
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
        onClick={() => {}}
      >
        start quiz
      </Button>
    </div>
  );
}
