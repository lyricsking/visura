import { Types } from "mongoose";

export const Country = {
  England: ["Premier League"],
  Germany: ["Bundesliga"],
} as const;
export type Country = keyof typeof Country;

export type IPrediction = {
  type: ["outcome", "scoreline"];
  value: string;
  reason: string;
};

export interface ITips {
  _id: Types.ObjectId;
  teamA: string;
  teamB: string;
  matchDate: Date;
  country: Country;
  league: (typeof Country)[keyof typeof Country];
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
