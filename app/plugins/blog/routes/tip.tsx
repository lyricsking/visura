import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findPostById, findPostBySlug } from "../server/post.server";
import ReactMarkdown from "react-markdown";
import { formatDateOrTime } from "~/utils/date";
import { findTipBySlug } from "../server/tips.server";
import { Card, CardContent } from "~/components/card";

export default function TipPage() {
  const { tip } = useLoaderData<typeof loader>();
  let title =
    tip.leagueCountry +
    " " +
    tip.league +
    " - " +
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
          <CardContent>
            <div className="grid grid-flow-col auto-cols-auto gap-6 divide-y sm:divide-x sm:divide-y-0">
              <div>{tip.teamA}</div>
              <div></div>
              <div>{tip.teamB}</div>
            </div>
          </CardContent>
        </Card>
        {/* Formatted content here */}
        <div className="prose md:prose-lg lg:prose-xl">
          <h4 className="text-2xl font-semibold">Match Preview</h4>
          <ReactMarkdown>{tip.introduction}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["slug"];
  if (!slug) throw Error("Tip id must be provided.");

  let tip = await findTipBySlug({ slug });
  console.log(tip);

  if (!tip.data) throw Error("No tip was found with such.");

  return json({ tip: tip.data });
};
