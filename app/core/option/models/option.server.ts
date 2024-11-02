import mongoose, { model, Model, models, Schema, Types } from "mongoose";
export const DISPLAY_OPTION_KEY = "rwp_display";

export interface IOption {
  id: Types.ObjectId;
  name: string;
  value: any;
  autoload: boolean;
}

type IOptionModel = Model<IOption>;
const optionSchema = new Schema<IOption, IOptionModel>({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, default: {} },
  autoload: { type: Boolean, default: false },
});

export const OptionModel: IOptionModel =
  mongoose.models.Option ||
  model<IOption, IOptionModel>("Option", optionSchema);
