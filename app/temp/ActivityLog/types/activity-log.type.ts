// models/Log.ts
import { Schema, Types, model } from "mongoose";

export interface IActivityLog {
  _id: Types.ObjectId;
  action: string;
  details: string;
  timestamp: Date;
  order?: Schema.Types.ObjectId; // Optional reference to the order
  staff?: Schema.Types.ObjectId; // Optional reference to the staff
  subscription?: Schema.Types.ObjectId; // Optional reference to the subscription
  ticket?: Schema.Types.ObjectId; // Optional reference to the ticket
  user?: Schema.Types.ObjectId; // Optional reference to the user
}
