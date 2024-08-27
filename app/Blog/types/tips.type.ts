import { Types } from "mongoose";

export const Country = {
  England: ["Premier League"],
  Germany: ["Bundesliga"],
} as const;
export type Country = keyof typeof Country;

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
  introduction: string;
  prediction: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}
