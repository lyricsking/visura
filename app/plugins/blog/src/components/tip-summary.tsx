import { Calendar, MessageCircleIcon } from "lucide-react";
import { ITips } from "../types/tips.type";
import { formatDateByParts } from "~/core/utils/date";
import { buttonVariants } from "~/components/button";
import { Link } from "@remix-run/react";
import { cn } from "~/core/utils/util";
import { getSlug } from "../utils/slug";

type TipCardProps = {
  tip: ITips;
};

export const TipSummary = (props: TipCardProps) => {
  const { tip } = props;

  let path = "";
  path && path.length > 0 ? path : "/" + path;
  path += "/tips";

  return (
    <div className="py-4 border-gray-200">
      <div className="flex flex-col items-start justify-between">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/images/football.png"
              alt="football img"
              className="h-6 w-6 mr-2"
            />
            <h3 className="text-xl font-bold">
              {tip.prediction.outcome.value}
            </h3>
          </div>
          <Link
            to={path + "/" + tip.slug}
            className={cn(
              buttonVariants({ variant: "outline", radius: "md" }),
              "text-white bg-red-400 "
            )}
          >
            See Predictions
          </Link>
        </div>
        <div>
          <h4 className="text-md font-semibold">
            {tip.teamA} vs {tip.teamB}
          </h4>
          <p className="text-sm text-gray-500">
            {tip.leagueCountry} {tip.league}
          </p>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">
              <Calendar className="h-5 w-5" />
            </span>
            {tip.matchDate ? formatDateByParts(new Date(tip.matchDate)) : "-"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-2 hidden">
        <div className="inline-flex">
          <MessageCircleIcon className="h-5 w-5 mr-2" />
          <p className=" text-sm text-gray-500">9 comments</p>
        </div>
        <div className="inline-flex">
          <span className="h-5 w-5 mr-1">🏅</span>
          <p className="text-sm text-gray-500">2 experts</p>
        </div>
      </div>
    </div>
  );
};
