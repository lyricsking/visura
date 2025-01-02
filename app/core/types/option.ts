import { Types } from "mongoose";

export const DISPLAY_OPTION_KEY = "rwp_display";

export interface IOption {
  id: Types.ObjectId;
  name: string;
  value: any;
  autoload: boolean;
}
