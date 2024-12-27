import mongoose, { Schema, Types } from "mongoose";

// Interface for Country
export interface ILeagueCountry {
  _id: Types.ObjectId;
  name: string;
}

// Interface for League
export interface ILeague {
  _id: Types.ObjectId;
  name: string;
  country: Types.ObjectId; // Reference to Category model
}
