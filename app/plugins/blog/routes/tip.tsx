import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findPostById, findPostBySlug } from "../server/post.server";
import ReactMarkdown from "react-markdown";
import { formatDateByParts, formatDateOrTime } from "~/utils/date";
import { findTipBySlug } from "../server/tips.server";
import { Card, CardContent, CardFooter } from "~/components/card";

export default function TipPage() {
  const { tip } = useLoaderData<typeof loader>();
  let title =
    tip.leagueCountry +
    " " +
    tip.league +
    ": " +
    tip.teamA +
    " vs " +
    tip.teamB;

  let publishedOn = tip.publishedOn
    ? formatDateOrTime(new Date(tip.publishedOn), {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const matchDate = formatDateByParts(new Date(tip.matchDate));

  return (
    <article className="w-full mx-auto max-w-3xl px-4 md:py-8 md:px-6">
      <div className="flex flex-col p-4">
        <p className="text-gray-500">Published on {publishedOn}</p>

        <h1 className="text-5xl break-words font-bold mt-1">{title}</h1>
        <div className="flex items-center mt-4">
          <img
            src="author-image-url"
            alt=" author"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="ml-3">
              <p className="font-semibold">Jamiu</p>
              <p className="text-gray-500">@jamiu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Card className="w-full bg-white/90 overflow-hidden mb-6">
          <CardContent className="px-2">
            <div className="grid grid-cols-[30%_1fr_30%] gap-4 items-center md:gap-6 text-center mb-6">
              <p className="font-semibold">{tip.teamA}</p>
              <div className="grid grid-cols-1 font-semibold gap-4">
                <h4>League position</h4>
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 border-l-2 border-green-500"></div>
                    <div className="bg-green-500 text-black text-xl font-bold p-2 rounded">
                      {tip.teamARank}
                    </div>
                    <div className="h-12 border-l-2 border-green-500"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 border-l-2 border-red-500"></div>
                    <div className="bg-red-500 text-black text-xl font-bold p-2 rounded">
                      {tip.teamBRank}
                    </div>
                    <div className="h-12 border-l-2 border-red-500"></div>
                  </div>
                </div>
              </div>

              <p className="font-semibold">{tip.teamB}</p>
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <div className="font-semibold">
              
              Match Date <span className="font-normal">{matchDate}</span>
            </div>
          </CardFooter>
        </Card>
        {/* Formatted content here */}
        <div className="prose md:prose-lg lg:prose-xl mb-6">
          <h4 className="text-2xl font-semibold">Match Preview</h4>
          <ReactMarkdown>{tip.introduction}</ReactMarkdown>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold">Match Predictions</h4>
          <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50">
            <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
              "Flowbite is just awesome. It contains tons of predesigned
              components and pages starting from login screen to complex
              dashboard. Perfect choice for your next SaaS application."
            </p>
          </blockquote>
        </div>
      </div>
    </article>
  );
}

export const loade<r = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["slug"];
  if (!slug) throw Error("Tip id must be provided.");

  let tip = await findTipBySlug({ slug });
  console.log(tip);

  if (!tip.data) throw Error("No tip was found with such.");

  return json({ tip: tip.data });
};
