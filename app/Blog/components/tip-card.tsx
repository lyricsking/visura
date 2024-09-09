import { Calendar, MessageCircleIcon } from "lucide-react";
import { ITips } from "../types/tips.type";
import { formatDateByParts } from "~/utils/date";

type TipCardProps = {
  tip: ITips;
};

export const TipCard = (props: TipCardProps) => {
  const { tip } = props;

  return (
    <div className="p-4 border-gray-200">
      <div className="flex flex-col items-start justify-between">
        <div className="flex items-center">
          <img
            src="/path/to/football-icon.png"
            alt="Football"
            className="w-6 h-6 mr-2"
            // alt={post.title}
            // width="804"
            // height="452"
            // className="rounded-md border bg-muted transition-colors"
            // src={"/images/tips/" + post.featuredImage}
            // className="w-6 h-6 mr-2"
          />
          <h3 className="mb-3 text-xl font-bold">
            {tip.prediction.outcome.value}
          </h3>
        </div>
        <div>
          <h4 className="text-md font-semibold">
            {tip.teamA} vs {tip.teamB}
          </h4>
          <p className="text-sm text-gray-500">
            {tip.country} {tip.league}
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
