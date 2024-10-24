import { LinksFunction, type MetaFunction } from "@remix-run/node";
import { ArrowBigDownDash, ListFilter } from "lucide-react";

import { PostSummary } from "../components/post-summary";
import { findFontByName } from "~/core/utils/fonts";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import Button from "~/core/components/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/core/components/card";
import { serverOnly$ } from "vite-env-only/macros";
import { TipSummary } from "../components/tip-card";
import { ITips } from "../types/tips.type";
import { PluginLoaderFunction } from "~/core/types/route";
import { findPosts } from "../server/post.server";
import { findTips } from "../server/tips.server";

export const blogLoader: PluginLoaderFunction | undefined = serverOnly$(
  async () => {
    const [tips, posts] = await Promise.all([
      findTips(),
      findPosts({ published: true }),
    ]);

    return { tips, posts };
  }
);

export const links: LinksFunction = () => {
  const merriweather = findFontByName("Playfair Display");
  const raleway = findFontByName("Raleway");

  const links = [];

  if (merriweather)
    links.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links.push({ rel: raleway.rel, href: raleway.href });

  return links;
};

export const meta: MetaFunction<typeof blogLoader> = ({ data }) => {
  const { app } = data as any;

  return [
    { title: app.appName },
    { name: "description", content: app.description },
  ];
};

export default function Blog({ tips, posts }: any, path: string) {
  //const { tips, posts } = useLoaderData<typeof loader>();

  const font = findFontByName("Courier Prime");

  console.log("path", path);

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
                {/* <ScrollArea className="whitespace-nowrap" type="auto"> */}
                <div className="grid sm:grid-cols-2 gap-6 divide-y sm:divide-x sm:divide-y-0">
                  {tips &&
                    tips.map((tip, index) => (
                      <TipSummary key={index} tip={tip as unknown as ITips} />
                    ))}
                </div>

                {/*<ScrollBar orientation="horizontal" />
                </ScrollArea>*/}
              </CardContent>
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
                <ScrollArea className="h-[500px] w-full" type="auto">
                  <div className="grid sm:grid-cols-2 gap-6 divide-y sm:divide-x sm:divide-y-0">
                    {tips &&
                      tips.map((tip, index) => (
                        <TipSummary key={index} tip={tip as unknown as ITips} />
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
                  {posts &&
                    posts.map((post) => (
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
