import { ITips } from "../types/tips.type";

type TipCardProps = {
  tip: ITips;
};

export const TipCard = (props: TipCardProps) => {
  const { tip } = props;

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/path/to/football-icon.png"
            alt="Football"
            className="w-6 h-6 mr-2"
          />
          <div>
            <h3 className="text-lg font-semibold">{tip.prediction[0].value}</h3>
            <p className="text-sm text-gray-500">
              {tip.country} {tip.league}
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="mr-2">
                <i className="calendar-icon" />
              </span>
              {/* {tip.matchDate)} */}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{"hfhfhf"}</p>
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            Add +
          </button>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        {/* <div className="flex items-center">
          <span className="mr-1">🏅</span>
          <p className="text-sm text-gray-600">{tip.experts} experts</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {tip.winTips} / {tip.totalTips} Win Tips
          </p>
          <p className="text-sm text-gray-600">{tip.winPercentage}%</p>
        </div> */}
      </div>
      <div className="mt-2">
        {/* <p className="text-sm text-gray-500">{tip.comments} comments</p> */}
      </div>
    </div>
  );
};
