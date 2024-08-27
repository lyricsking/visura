import { Types } from "mongoose";

export const Country = {
  England: ["Premier League"],
  Germany: ["Bundesliga"],
} as const;
export type Country = keyof typeof Country;

export const PredictionType = {
  outcome: "Outcome",
  scoreline: "scoreline",
} as const;
export type PredictionType = keyof typeof PredictionType;

export type IPrediction = Record<
  PredictionType,
  {
    value: string;
    reason: string;
  }
>;

export const League = Object.values(Country).flat();
export type League = (typeof League)[number];

export interface ITips {
  _id: Types.ObjectId;
  teamA: string;
  teamB: string;
  matchDate: Date;
  country: Country;
  league: League;
  teamARank: number;
  teamBRank: number;
  author: Types.ObjectId;
  prediction: IPrediction[];
  introduction: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}
