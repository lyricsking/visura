import React from 'react';

const TipCard = ({ tip }) => {
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
            <h3 className="text-lg font-semibold">{tip.teamA} v {tip.teamB}</h3>
            <p className="text-sm text-gray-500">{tip.country} {tip.league}</p>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="mr-2"><i className="calendar-icon" /></span>
              {tip.matchDate}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{tip.odds}</p>
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            Add +
          </button>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-1">🏅</span>
          <p className="text-sm text-gray-600">{tip.experts} experts</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">{tip.winTips} / {tip.totalTips} Win Tips</p>
          <p className="text-sm text-gray-600">{tip.winPercentage}%</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{tip.comments} comments</p>
      </div>
    </div>
  );
};

const TipsList = ({ tips }) => {
  return (
    <div className="bg-white rounded shadow-md">
      {tips.map((tip, index) => (
        <TipCard key={index} tip={tip} />
      ))}
    </div>
  );
};

// Example usage with dummy data
const dummyTips = [
  {
    teamA: 'Tottenham',
    teamB: 'Everton',
    matchDate: 'Today 15:00',
    country: 'England',
    league: 'Premier League',
    odds: '1.40',
    experts: 2,
    winTips: 150,
    totalTips: 177,
    winPercentage: 85,
    comments: 69,
  },
  {
    teamA: 'Man City',
    teamB: 'Ipswich',
    matchDate: 'Today 15:00',
    country: 'England',
    league: 'Premier League',
    odds: '1.10',
    experts: 5,
    winTips: 138,
    totalTips: 159,
    winPercentage: 87,
    comments: 63,
  },
  // Add more dummy tips as needed
];

export default function TipsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tips</h1>
      <TipsList tips={dummyTips} />
    </div>
  );
}
