import { Types } from "mongoose";

export const PredictionType = {
  outcome: "outcome",
  scoreline: "scoreline",
} as const;
export type PredictionType = keyof typeof PredictionType;

export type IPrediction = Record<PredictionType, {
  value: string;
  reason: string;
  }>;

export interface ITips {
  _id: Types.ObjectId;
  teamA: string;
  teamB: string;
  matchDate: Date;
  country: Types.ObjectId;
  league: string;
  teamARank: number;
  teamBRank: number;
  author: Types.ObjectId;
  prediction: IPrediction;
  introduction: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  publishedOn: Date;
}
