import { LinksFunction, json, type MetaFunction } from "@remix-run/node";
import { findFontByName } from "~/shared/data/fonts";
import { config } from "@/config";
import { ArrowBigDownDash, ListFilter } from "lucide-react";

import Button from "~/components/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { SelectItem } from "@radix-ui/react-select";
import { findTips } from "../server/tips.server";
import { findPosts, generateDummyPosts } from "../server/post.server";
import { useLoaderData } from "@remix-run/react";
import { TipCard } from "../components/tip-card";
import { ITips } from "../types/tips.type";
import { ScrollArea, ScrollBar } from "~/components/scrollable.area";
import { PostSummary } from "../components/post-summary";
import { IPost } from "../types/post.type";
import { Types } from "mongoose";

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

export default function Index() {
  const { tips, posts } = useLoaderData<typeof loader>();

  console.log(tips, posts);

  const font = findFontByName("Courier Prime");

  return (
    <div className="flex flex-col items-start">
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: `url('/images/soccer-pitch.jpg')` }}
      >
        <div className=" bg-gray-700/20">
          <div className="mx-auto max-w-3xl text-center px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
            <h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{
                fontFamily: font!.value,
              }}
            >
              Sport tips, predictions, analysis and news
            </h1>
          </div>
        </div>
      </div>

      <div
        className="flex-1 w-full bg-repeat md:bg-no-repeat md:bg-cover md:bg-center"
        style={{
          backgroundImage: `url('/illustrations/bg-man-soccer.svg')`,
        }}
      >
        <div className="bg-gray-100/40">
          <div className="mx-auto grid w-full max-w-3xl items-start rounded-md p-4 md:p-8 gap-2">
            <Card className="w-full bg-white/90 overflow-hidden">
              <CardHeader className="p-0">
                <div className="flex flex-row flex-wrap items-center justify-center gap-4 p-2 bg-red-500 text-lg text-white font-semibold ">
                  <h3 className="text-lg font-bold tracking-tight pe-4 border-e">
                    Top Fixtures
                  </h3>
                  <Button variant="outline" className="flex-none ml-auto">
                    <ListFilter className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <ScrollArea className="whitespace-nowrap" type="auto">
                  <div className="w-max grid grid-flow-col auto-cols-fr space-x-4 p-4 divide-x">
                    {tips.map((tip, index) => (
                      <TipCard key={index} tip={tip as unknown as ITips} />
                    ))}
                  </div>

                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>

              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 border border-gray-600"
                >
                  <ArrowBigDownDash className="h-3.5 w-3.5" />
                  Load more
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mx-auto grid w-full max-w-3xl items-start p-4 md:p-8 gap-4 overflow-x-hidden">
            <Card className="w-full bg-white/90 overflow-hidden">
              <CardHeader className="p-0">
                <div className="flex flex-row flex-wrap items-center justify-center gap-4 px-6 bg-red-500 text-lg text-white font-semibold ">
                  <h3 className="text-lg font-bold tracking-tight pe-4 border-e">
                    Tips
                  </h3>

                  <Select>
                    <SelectTrigger className="flex-1 py-6 border-none rounded-none">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="light">England</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="flex-1 py-6 border-none rounded-none">
                      <SelectValue placeholder="League" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="light">Premier League</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-96 w-full" type="auto">
                  <div className="grid sm:grid-cols-2 gap-6 p-4 divide-y">
                    {tips.map((tip, index) => (
                      <TipCard key={index} tip={tip as unknown as ITips} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 border border-gray-600"
                >
                  <ArrowBigDownDash className="h-3.5 w-3.5" />
                  Load more
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
            <div className="mx-auto w-full bg-white/90 border rounded-md shadow-sm">
              <h3 className="col-span-full mt-8 text-3xl text-center sm:text-4xl font-bold tracking-tight mb-10">
                Team News
              </h3>
              <ScrollArea className="h-96 w-full" type="auto">
                <div className="grid sm:grid-cols-2 w-full items-start p-6 md:p-8 gap-6">
                  {posts.map((post) => (
                    <PostSummary key={post._id} post={post} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = async () => {
  const [tips, posts] = await Promise.all([
    findTips(),
    findPosts({ published: true }),
  ]);

  return json({ tips, posts });
};
