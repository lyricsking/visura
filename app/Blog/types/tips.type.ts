import { Types } from "mongoose";

export const Country = {
  England: ["Premier League"],
  Germany: ["Bundesliga"],
} as const;
export type Country = keyof typeof Country;

export interface Tips {
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
  exercpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}

export interface News {
  _id: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  content: string;
  exercpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}
