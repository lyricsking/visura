import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findPostById, findPostBySlug } from "../server/post.server";
import ReactMarkdown from "react-markdown";
import { formatDateByParts, formatDateOrTime } from "~/utils/date";
import { findTipBySlug } from "../server/tips.server";
import { loader } from "../loaders/tip.loader";
import { Card, CardHeader, CardContent } from "~/components/card";

export default function TipPage({ tip }: ReturnType<typeof loader>) {
  let title = tip.teamA + " - " + tip.teamB;
  let publishedOn = tip.publishedOn
    ? formatDateOrTime(new Date(tip.publishedOn), {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  //const matchDate = formatDateByParts(new Date(tip.matchDate));
  const matchDate = formatDateOrTime(new Date(tip.matchDate), {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

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
        <Card className="w-full bg-gray-50/90 shadow-md overflow-hidden mb-6">
          <CardHeader className="justify-center border-b py-4">
            <div className="w-full grid grid-cols-[30%_1fr] gap-4 font-semibold">
              Match Date:
              <span className="w-full font-normal">{matchDate}</span>
            </div>

            <div className="text-xl font-bold text-center">
              {tip.leagueCountry} - {tip.league}
            </div>
          </CardHeader>
          <CardContent className="py-6 px-2">
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
        </Card>
        {/* Formatted content here */}
        <div className="prose md:prose-lg lg:prose-xl mb-6">
          <h4 className="text-2xl font-semibold">Match Preview</h4>
          <ReactMarkdown>{tip.introduction}</ReactMarkdown>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold">Match Predictions</h4>
          <div className="grid gap-6">
            {Object.keys(tip.prediction).map((key) => {
              return (
                <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 rounded-md">
                  <p className="text-2xl capitalize italic font-semibold text-gray-900 dark:text-white mb-6">
                    {key}:
                  </p>

                  <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                    "Flowbite is just awesome. It contains tons of predesigned
                    components and pages starting from login screen to complex
                    dashboard. Perfect choice for your next SaaS application."
                  </p>
                </blockquote>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
